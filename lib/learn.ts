import { BacktestResult, LearningReport } from './types';

export function generateDeterministicLearningReport(result: BacktestResult): LearningReport {
  const {
    totalTrades,
    winRatePct,
    avgReturnPct,
    medianReturnPct,
    bestTradePct,
    worstTradePct,
    profitFactor,
    strategyCumulativeReturnPct,
    benchmarkCumulativeReturnPct,
    maxDrawdownPct,
    config,
    hasLookAheadBiasWarning,
  } = result;

  // 1. Pure Factual Data Observations
  const dataObservations: string[] = [
    `Sample Size: A total of ${result.totalSignals} signals met the drop criteria (>= ${config.fallThresholdPct}% in ${config.fallWindowDays} day), resulting in ${totalTrades} non-overlapping executed trades between ${config.startDate} and ${config.endDate}.`,
    `Win Rate: Out of ${totalTrades} trades, ${result.winCount} were profitable (${winRatePct}%), while ${result.lossCount} resulted in losses.`,
    `Return Profile: The average net return per trade was ${avgReturnPct > 0 ? '+' : ''}${avgReturnPct}%, with a median return of ${medianReturnPct > 0 ? '+' : ''}${medianReturnPct}%.`,
    `Tail Risk Extremes: The best performing single trade returned +${bestTradePct}%, whereas the worst single trade suffered ${worstTradePct}%.`,
    `Cumulative Performance: The strategy generated a cumulative net return of ${strategyCumulativeReturnPct > 0 ? '+' : ''}${strategyCumulativeReturnPct}% with a maximum drawdown of -${maxDrawdownPct}%, compared to the buy-and-hold benchmark return of +${benchmarkCumulativeReturnPct}%.`,
  ];

  if (hasLookAheadBiasWarning) {
    dataObservations.push(
      `Execution Alert: This test utilized 'Same Day Close' entry, which artificially inflates results due to look-ahead bias.`
    );
  }

  // 2. System Interpretation
  const isPositiveExpectancy = avgReturnPct > 0.2;
  const isHighDrawdown = maxDrawdownPct > 15;

  const systemInterpretation: string[] = [];

  if (isPositiveExpectancy && winRatePct >= 50) {
    systemInterpretation.push(
      `Mean-Reversion Tendency: Following a sharp ${config.fallThresholdPct}% drop, market participants frequently overreact in the immediate aftermath, creating short-term buying pressure that tends to lift prices over a ${config.holdingDays}-day window.`
    );
  } else if (isPositiveExpectancy && winRatePct < 50) {
    systemInterpretation.push(
      `Asymmetric Payoff: Although win rate is under 50%, the positive average return (+${avgReturnPct}%) suggests that winning rebounds were substantially larger in magnitude than losing follow-throughs.`
    );
  } else {
    systemInterpretation.push(
      `Weak / Negative Drift: The average return (${avgReturnPct}%) and win rate (${winRatePct}%) suggest that blindly buying drops without regime filtering leaves the trader exposed to momentum continuations where declines snowball further.`
    );
  }

  if (isHighDrawdown) {
    systemInterpretation.push(
      `Severe Regime Asymmetry: The strategy suffered a severe drawdown of -${maxDrawdownPct}%. During prolonged market crises (e.g. March 2020), successive drops do not immediately bounce; dip-buying in a structural crisis can cause catastrophic capital erosion without an explicit stop-loss.`
    );
  } else {
    systemInterpretation.push(
      `Controlled Drawdown: Maximum drawdown remained contained at -${maxDrawdownPct}%, primarily because capital was kept in cash outside the brief ${config.holdingDays}-day trade windows.`
    );
  }

  systemInterpretation.push(
    `Opportunity Cost of Cash: While cumulative strategy return was ${strategyCumulativeReturnPct}%, the benchmark produced +${benchmarkCumulativeReturnPct}%. Because the strategy is only in the market for brief periods, it sacrifices the secular compounding of long-term index holding.`
  );

  // 3. Caveats & Limitations
  const caveats: string[] = [
    `Small Sample Size: ${totalTrades} trades over a 6-year period is a statistically small sample. The observed win rate (${winRatePct}%) has a wide confidence interval and could easily diverge over the next 20 trades.`,
    `Market Regime Bias: The test period (2018–2024) was predominantly an overarching secular bull market with one brief crash (COVID 2020) that saw historic central bank liquidity injections. In a multi-year secular bear market (e.g. 2000–2003 or 2008), dip buying could yield consecutive failing trades.`,
    `Execution & Slippage Reality: We modeled ${config.slippagePct * 2}% round-trip slippage and ${config.transactionCostPct * 2}% costs. However, in extreme panic sessions (e.g., gap downs or circuit filters), open execution slippage can be significantly worse than 0.10%.`,
    `Lack of Stop-Loss Rule: The current experiment tests a purely time-based exit (${config.holdingDays} days). In real-world trading, holding through an uncontrolled cascading decline without a stop loss is rarely viable for risk-managed portfolios.`,
    `Survivorship and Index Reconstitution: The NIFTY 50 index periodically replaces underperforming constituents with high-growth winners, creating an inherent upward bias in index historical series.`,
  ];

  // 4. Conclusion (Careful & Honest)
  let conclusion = '';
  if (isPositiveExpectancy && avgReturnPct > 0.5 && winRatePct > 55) {
    conclusion = `In this sample dataset, buying NIFTY after a ${config.fallThresholdPct}% single-day drop exhibited a mild positive statistical edge with an average return of +${avgReturnPct}% over a ${config.holdingDays}-day holding period. However, this edge is NOT an all-weather money-maker: the strategy underperformed the passive benchmark cumulatively and suffered steep drawdowns during persistent downturns. It functions best as an opportunistic tactical filter rather than a standalone mechanical strategy.`;
  } else if (avgReturnPct > 0) {
    conclusion = `The data indicates only a marginal positive edge (+${avgReturnPct}% average return) that barely offsets real-world execution friction and gap-down risks. Without additional filters (such as trend direction or volatility indicators), simple dip-buying cannot be deemed reliably profitable on NIFTY.`;
  } else {
    conclusion = `The data does NOT support the hypothesis that blindly buying NIFTY after a ${config.fallThresholdPct}% decline works. Net returns after realistic friction were negative (${avgReturnPct}%), showing that falling markets frequently continue downward over short time horizons.`;
  }

  // 5. Next Investigations
  const nextInvestigations: string[] = [
    `Trend Regime Filter: What happens if we only buy drops when NIFTY is trading ABOVE its 200-day Simple Moving Average (bull market pullbacks only)?`,
    `Holding Horizon Sensitivity: Compare returns across 1-day, 3-day, 5-day, 10-day, and 20-day holding windows to identify the peak of the mean-reversion curve.`,
    `Stop-Loss Integration: Test the impact of adding an explicit 2.0% stop-loss to truncate worst-case tail risks (like the March 2020 cascade).`,
    `Consecutive Down Days: Test whether 3 consecutive negative days provides a higher win rate signal than a single large percentage drop.`,
  ];

  return {
    dataObservations,
    systemInterpretation,
    caveats,
    conclusion,
    nextInvestigations,
    isAiGenerated: false,
  };
}
