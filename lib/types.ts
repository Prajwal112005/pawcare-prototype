export type Step = 'ASK' | 'CLARIFY' | 'DEFINE' | 'TEST' | 'LEARN';

export interface PriceBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  changePct?: number; // Close to Close return
}

export type FallWindow = '1_DAY' | '3_DAYS' | '5_DAYS';
export type EntryRule = 'NEXT_OPEN' | 'SAME_CLOSE'; // SAME_CLOSE is flagged as look-ahead bias!
export type ExitRule = 'HOLD_DAYS_OPEN' | 'HOLD_DAYS_CLOSE';

export interface UserInputAnalysis {
  originalQuestion: string;
  instrument: string;
  userSpecified: {
    instrumentDetected: string;
    fallMagnitude?: number; // e.g. 3.0%
    fallWindow?: FallWindow;
    holdingDays?: number;
    action: 'BUY' | 'SELL';
  };
  systemAssumptions: {
    fallThresholdPct: number; // e.g. 3.0
    fallWindow: FallWindow;
    entryRule: EntryRule;
    holdingDays: number; // e.g. 5
    transactionCostPct: number; // e.g. 0.05%
    slippagePct: number; // e.g. 0.05%
    testPeriod: string; // "2018-01-01 to 2024-01-15"
  };
  ambiguities: {
    key: string;
    title: string;
    description: string;
    options: { label: string; value: any; isRecommended?: boolean }[];
    selectedValue: any;
  }[];
}

export interface ExperimentConfig {
  id: string;
  instrument: string;
  conditionDescription: string;
  fallThresholdPct: number; // e.g. 3% drop
  fallWindowDays: number; // 1 day
  entryRule: EntryRule;
  exitRule: ExitRule;
  holdingDays: number; // 5 days
  transactionCostPct: number; // 0.05% per leg = 0.10% round trip
  slippagePct: number; // 0.05% per leg = 0.10% round trip
  startDate: string;
  endDate: string;
  hypothesis: string;
}

export interface Trade {
  id: number;
  signalDate: string;
  signalDropPct: number;
  entryDate: string;
  entryPrice: number;
  exitDate: string;
  exitPrice: number;
  holdingDays: number;
  grossReturnPct: number;
  netReturnPct: number;
  isWin: boolean;
  notes?: string;
}

export interface EquityPoint {
  date: string;
  strategyValue: number; // Starting at 100
  benchmarkValue: number; // Starting at 100
  inPosition: boolean;
}

export interface BacktestResult {
  config: ExperimentConfig;
  totalBars: number;
  totalSignals: number;
  totalTrades: number;
  winCount: number;
  lossCount: number;
  winRatePct: number;
  avgReturnPct: number;
  medianReturnPct: number;
  bestTradePct: number;
  worstTradePct: number;
  profitFactor: number;
  strategyCumulativeReturnPct: number;
  benchmarkCumulativeReturnPct: number;
  maxDrawdownPct: number;
  trades: Trade[];
  equityCurve: EquityPoint[];
  hasLookAheadBiasWarning: boolean;
  lookAheadBiasExplanation?: string;
}

export interface LearningReport {
  dataObservations: string[];
  systemInterpretation: string[];
  caveats: string[];
  conclusion: string;
  nextInvestigations: string[];
  isAiGenerated: boolean;
}
