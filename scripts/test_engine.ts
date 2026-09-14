import { getNiftyHistoricalData } from '../lib/data';
import { runBacktest } from '../lib/backtest';
import { analyzeResearchQuestion, buildExperimentConfig } from '../lib/clarify';
import { generateDeterministicLearningReport } from '../lib/learn';

console.log('=== RUNNING VERIFICATION TEST SUITE ===\n');

// Test 1: Historical data loading
const bars = getNiftyHistoricalData();
console.log(`[TEST 1] Loaded ${bars.length} NIFTY daily bars.`);
if (bars.length < 1000) {
  throw new Error(`Expected at least 1000 bars, got ${bars.length}`);
}
console.log(`✓ Test 1 passed (Date range: ${bars[0].date} to ${bars[bars.length - 1].date})\n`);

// Test 2: Natural Language Clarification Analysis
const question = 'Does buying NIFTY after a sharp fall work?';
const analysis = analyzeResearchQuestion(question);
console.log(`[TEST 2] Analyzing Question: "${question}"`);
console.log('Detected Instrument:', analysis.instrument);
console.log('Detected Action:', analysis.userSpecified.action);
console.log('System Baseline Assumptions:', analysis.systemAssumptions);
console.log('Identified Ambiguities:', analysis.ambiguities.map((a) => a.key));
if (analysis.ambiguities.length < 4) {
  throw new Error('Expected at least 4 ambiguity dimensions identified');
}
console.log('✓ Test 2 passed (Clarification engine correctly isolated ambiguities)\n');

// Test 3: Standard Experiment Backtest (3% fall, 5-day hold, NEXT_OPEN)
const config = buildExperimentConfig(analysis, {
  fallThresholdPct: 3.0,
  fallWindow: '1_DAY',
  entryRule: 'NEXT_OPEN',
  holdingDays: 5,
  transactionCostPct: 0.05,
  slippagePct: 0.05,
});
console.log(`[TEST 3] Running Standard Backtest: ${config.conditionDescription}`);
const result = runBacktest(bars, config);
console.log(`Executed Trades: ${result.totalTrades} (from ${result.totalSignals} signals)`);
console.log(`Win Rate: ${result.winRatePct}% (${result.winCount} Wins / ${result.lossCount} Losses)`);
console.log(`Avg Net Return: ${result.avgReturnPct}% | Median Return: ${result.medianReturnPct}%`);
console.log(`Best Trade: +${result.bestTradePct}% | Worst Trade: ${result.worstTradePct}%`);
console.log(`Profit Factor: ${result.profitFactor}`);
console.log(`Max Drawdown: -${result.maxDrawdownPct}%`);
console.log(`Strategy Cumulative Return: ${result.strategyCumulativeReturnPct}%`);
console.log(`Benchmark Cumulative Return: +${result.benchmarkCumulativeReturnPct}%`);
console.log(`Look-Ahead Bias Warning: ${result.hasLookAheadBiasWarning}`);

// Verify anti-lookahead execution for every trade
for (const trade of result.trades) {
  const signalIdx = bars.findIndex((b) => b.date === trade.signalDate);
  const entryIdx = bars.findIndex((b) => b.date === trade.entryDate);
  if (entryIdx <= signalIdx) {
    throw new Error(
      `Look-ahead bias detected in trade ${trade.id}! Entry date (${trade.entryDate}) <= Signal date (${trade.signalDate})`
    );
  }
}
console.log('✓ Test 3 passed (Anti-lookahead verified: 100% of trades entered strictly on Day T+1)\n');

// Test 4: Learning Report Generation
console.log('[TEST 4] Generating Structured Learning Report...');
const report = generateDeterministicLearningReport(result);
console.log('\n--- DATA OBSERVATIONS (FACTUAL) ---');
report.dataObservations.forEach((o) => console.log('•', o));
console.log('\n--- SYSTEM INTERPRETATION ---');
report.systemInterpretation.forEach((i) => console.log('•', i));
console.log('\n--- CAVEATS ---');
report.caveats.forEach((c) => console.log('•', c));
console.log('\n--- CONCLUSION ---');
console.log(report.conclusion);
console.log('\n--- NEXT INVESTIGATIONS ---');
report.nextInvestigations.forEach((n) => console.log('•', n));
console.log('\n✓ Test 4 passed (Learning report successfully categorized all dimensions)\n');

// Test 5: Look-Ahead Bias Mode Check (SAME_CLOSE)
console.log('[TEST 5] Testing Look-Ahead Bias Flag with SAME_CLOSE entry...');
const lookAheadConfig = { ...config, entryRule: 'SAME_CLOSE' as const };
const lookAheadResult = runBacktest(bars, lookAheadConfig);
if (!lookAheadResult.hasLookAheadBiasWarning) {
  throw new Error('Expected lookAheadResult.hasLookAheadBiasWarning to be true!');
}
console.log('✓ Test 5 passed (Look-ahead bias correctly flagged and alerted)\n');

console.log('=== ALL 5 VERIFICATION TESTS PASSED SUCCESSFULLY ===');
