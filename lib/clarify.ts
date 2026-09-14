import { UserInputAnalysis, ExperimentConfig, FallWindow, EntryRule, ExitRule } from './types';

export function analyzeResearchQuestion(rawQuestion: string): UserInputAnalysis {
  const q = rawQuestion.toLowerCase();

  // 1. Detect Instrument
  let detectedInstrument = 'NIFTY 50';
  if (q.includes('banknifty') || q.includes('bank nifty')) {
    detectedInstrument = 'BANKNIFTY';
  } else if (q.includes('sp500') || q.includes('s&p') || q.includes('spy')) {
    detectedInstrument = 'S&P 500 (Mapped to NIFTY)';
  } else if (q.includes('nifty')) {
    detectedInstrument = 'NIFTY 50';
  }

  // 2. Detect Action
  const isSell = q.includes('short') || q.includes('sell');
  const action = isSell ? ('SELL' as const) : ('BUY' as const);

  // 3. Detect any explicit percentage
  let explicitThreshold: number | undefined = undefined;
  const pctMatch = q.match(/(\d+(?:\.\d+)?)\s*%/);
  if (pctMatch) {
    explicitThreshold = parseFloat(pctMatch[1]);
  }

  // 4. Detect any explicit holding period or days
  let explicitHoldingDays: number | undefined = undefined;
  const holdMatch = q.match(/hold(?:ing)?\s*(?:for)?\s*(\d+)\s*(?:day|trade|session)/i) ||
                    q.match(/(\d+)[ -]day\s*hold/i);
  if (holdMatch) {
    explicitHoldingDays = parseInt(holdMatch[1], 10);
  }

  // 5. Default baseline assumptions
  const defaultThreshold = explicitThreshold || 3.0;
  const defaultWindow: FallWindow = '1_DAY';
  const defaultHoldingDays = explicitHoldingDays || 5;
  const defaultEntryRule: EntryRule = 'NEXT_OPEN';
  const defaultCostPct = 0.05;
  const defaultSlippagePct = 0.05;

  const ambiguities = [
    {
      key: 'fallMagnitude',
      title: 'What defines a "sharp fall"?',
      description: explicitThreshold
        ? `You specified ${explicitThreshold}%. Confirm or choose a standard benchmark threshold:`
        : 'The term "sharp fall" is subjective. Select the quantitative percentage drop threshold to test:',
      options: [
        { label: '2.0% Single-Day Drop (Moderate Panic)', value: 2.0 },
        { label: '3.0% Single-Day Drop (Severe Panic)', value: 3.0, isRecommended: true },
        { label: '5.0% Multi-Day Drop (Crash / Circuit Event)', value: 5.0 },
      ],
      selectedValue: defaultThreshold,
    },
    {
      key: 'fallWindow',
      title: 'Over what timeframe should the fall occur?',
      description: 'Does the decline happen in a single trading session or across multiple sessions?',
      options: [
        { label: '1 Trading Day (Single-day shock close-to-close)', value: '1_DAY', isRecommended: true },
        { label: '3 Trading Days (Cascading decline over 3 sessions)', value: '3_DAYS' },
        { label: '5 Trading Days (Weekly sell-off)', value: '5_DAYS' },
      ],
      selectedValue: defaultWindow,
    },
    {
      key: 'entryRule',
      title: 'When should the buy order execute? (Execution Timing)',
      description: 'Crucial for avoiding Look-Ahead Bias. If a signal triggers on today’s close, how do you enter?',
      options: [
        {
          label: 'Next Day Market Open (Realistic: Zero Look-Ahead Bias)',
          value: 'NEXT_OPEN',
          isRecommended: true,
        },
        {
          label: 'Signal Day Close (Theoretical: Causes Look-Ahead Bias)',
          value: 'SAME_CLOSE',
        },
      ],
      selectedValue: defaultEntryRule,
    },
    {
      key: 'holdingPeriod',
      title: 'How long should the position be held?',
      description: 'What time horizon defines whether the rebound strategy "works"?',
      options: [
        { label: '3 Trading Days (Short bounce)', value: 3 },
        { label: '5 Trading Days (1 Calendar Week mean-reversion)', value: 5, isRecommended: true },
        { label: '10 Trading Days (Fortnight swing)', value: 10 },
        { label: '20 Trading Days (1 Calendar Month)', value: 20 },
      ],
      selectedValue: defaultHoldingDays,
    },
    {
      key: 'friction',
      title: 'Transaction Costs & Execution Slippage',
      description: 'Real-world trading involves exchange charges, STT (Securities Transaction Tax), brokerage, and bid-ask spread slippage.',
      options: [
        { label: '0.10% Round-Trip (0.05% brokerage + 0.05% slippage)', value: 0.05, isRecommended: true },
        { label: '0.20% Round-Trip (Conservative estimate for volatile days)', value: 0.10 },
        { label: '0.00% Zero Friction (Theoretical gross returns only)', value: 0.0 },
      ],
      selectedValue: defaultCostPct,
    },
  ];

  return {
    originalQuestion: rawQuestion,
    instrument: detectedInstrument,
    userSpecified: {
      instrumentDetected: detectedInstrument,
      fallMagnitude: explicitThreshold,
      fallWindow: undefined,
      holdingDays: explicitHoldingDays,
      action,
    },
    systemAssumptions: {
      fallThresholdPct: defaultThreshold,
      fallWindow: defaultWindow,
      entryRule: defaultEntryRule,
      holdingDays: defaultHoldingDays,
      transactionCostPct: defaultCostPct,
      slippagePct: defaultSlippagePct,
      testPeriod: '2018-01-01 to 2024-01-15 (Sample Historical Dataset)',
    },
    ambiguities,
  };
}

export function buildExperimentConfig(
  analysis: UserInputAnalysis,
  overrides?: Partial<{
    fallThresholdPct: number;
    fallWindow: FallWindow;
    entryRule: EntryRule;
    holdingDays: number;
    transactionCostPct: number;
    slippagePct: number;
    hypothesis: string;
  }>
): ExperimentConfig {
  const threshold = overrides?.fallThresholdPct ?? analysis.systemAssumptions.fallThresholdPct;
  const windowStr = overrides?.fallWindow ?? analysis.systemAssumptions.fallWindow;
  const windowDays = windowStr === '3_DAYS' ? 3 : windowStr === '5_DAYS' ? 5 : 1;
  const entryRule = overrides?.entryRule ?? analysis.systemAssumptions.entryRule;
  const holdingDays = overrides?.holdingDays ?? analysis.systemAssumptions.holdingDays;
  const costPct = overrides?.transactionCostPct ?? analysis.systemAssumptions.transactionCostPct;
  const slippagePct = overrides?.slippagePct ?? analysis.systemAssumptions.slippagePct;

  const hypothesis =
    overrides?.hypothesis ||
    `Buying ${analysis.instrument} after a sharp ${threshold}% single-day decline produces positive average forward returns over a ${holdingDays}-day holding period due to short-term panic mean-reversion.`;

  return {
    id: `exp_${Date.now()}`,
    instrument: analysis.instrument,
    conditionDescription: `${analysis.instrument} drops >= ${threshold}% in ${windowDays} trading day(s) (Close-to-Close)`,
    fallThresholdPct: threshold,
    fallWindowDays: windowDays,
    entryRule,
    exitRule: 'HOLD_DAYS_OPEN',
    holdingDays,
    transactionCostPct: costPct,
    slippagePct,
    startDate: '2018-01-01',
    endDate: '2024-01-15',
    hypothesis,
  };
}
