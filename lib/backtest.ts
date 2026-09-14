import { PriceBar, ExperimentConfig, BacktestResult, Trade, EquityPoint } from './types';

export function runBacktest(bars: PriceBar[], config: ExperimentConfig): BacktestResult {
  if (!bars || bars.length < 10) {
    return createEmptyResult(config);
  }

  // Filter bars by date range if specified
  let activeBars = bars;
  if (config.startDate && config.endDate) {
    activeBars = bars.filter((b) => b.date >= config.startDate && b.date <= config.endDate);
    if (activeBars.length < 10) {
      activeBars = bars; // fallback to all bars if filter is too restrictive
    }
  }

  const trades: Trade[] = [];
  let inTradeUntilBarIndex = -1;
  let totalSignals = 0;

  const isLookAhead = config.entryRule === 'SAME_CLOSE';
  const slippageFraction = config.slippagePct / 100;
  const costRoundTripPct = config.transactionCostPct * 2;

  // Scan through bars
  for (let i = config.fallWindowDays; i < activeBars.length - config.holdingDays - 2; i++) {
    // Check fall condition
    // For 1_DAY: (Close[i] - Close[i-1]) / Close[i-1] <= -threshold
    // For multi-day window: (Close[i] - Close[i-window]) / Close[i-window] <= -threshold
    const baseClose = activeBars[i - config.fallWindowDays].close;
    const signalClose = activeBars[i].close;
    const dropPct = ((signalClose - baseClose) / baseClose) * 100;

    if (dropPct <= -Math.abs(config.fallThresholdPct)) {
      totalSignals++;

      // If we are already in an active trade, avoid overlapping double-allocation
      if (i <= inTradeUntilBarIndex) {
        continue;
      }

      const signalBar = activeBars[i];
      let entryBarIndex: number;
      let entryRawPrice: number;

      if (isLookAhead) {
        // Look-ahead bias: Entering on the close of the signal day
        entryBarIndex = i;
        entryRawPrice = signalBar.close;
      } else {
        // Deterministic, realistic execution: Enter on NEXT trading day's OPEN
        entryBarIndex = i + 1;
        entryRawPrice = activeBars[entryBarIndex].open;
      }

      // Exit bar index calculation
      let exitBarIndex: number;
      let exitRawPrice: number;

      if (config.exitRule === 'HOLD_DAYS_CLOSE') {
        exitBarIndex = entryBarIndex + config.holdingDays - 1;
        if (exitBarIndex >= activeBars.length) break;
        exitRawPrice = activeBars[exitBarIndex].close;
      } else {
        // HOLD_DAYS_OPEN
        exitBarIndex = entryBarIndex + config.holdingDays;
        if (exitBarIndex >= activeBars.length) break;
        exitRawPrice = activeBars[exitBarIndex].open;
      }

      // Apply slippage
      const executedEntryPrice = entryRawPrice * (1 + slippageFraction);
      const executedExitPrice = exitRawPrice * (1 - slippageFraction);

      // Returns
      const grossReturnPct = ((exitRawPrice - entryRawPrice) / entryRawPrice) * 100;
      const netReturnPct = ((executedExitPrice - executedEntryPrice) / executedEntryPrice) * 100 - costRoundTripPct;

      trades.push({
        id: trades.length + 1,
        signalDate: signalBar.date,
        signalDropPct: parseFloat(dropPct.toFixed(2)),
        entryDate: activeBars[entryBarIndex].date,
        entryPrice: parseFloat(executedEntryPrice.toFixed(2)),
        exitDate: activeBars[exitBarIndex].date,
        exitPrice: parseFloat(executedExitPrice.toFixed(2)),
        holdingDays: config.holdingDays,
        grossReturnPct: parseFloat(grossReturnPct.toFixed(2)),
        netReturnPct: parseFloat(netReturnPct.toFixed(2)),
        isWin: netReturnPct > 0,
        notes: isLookAhead
          ? 'Warning: Executed on Signal Day Close (Look-ahead bias)'
          : 'Executed on Next Day Open (Zero look-ahead)',
      });

      inTradeUntilBarIndex = exitBarIndex;
    }
  }

  // Calculate Metrics
  const totalTrades = trades.length;
  const winCount = trades.filter((t) => t.isWin).length;
  const lossCount = totalTrades - winCount;
  const winRatePct = totalTrades > 0 ? parseFloat(((winCount / totalTrades) * 100).toFixed(1)) : 0;

  const returns = trades.map((t) => t.netReturnPct);
  const avgReturnPct =
    totalTrades > 0 ? parseFloat((returns.reduce((a, b) => a + b, 0) / totalTrades).toFixed(2)) : 0;

  // Median return
  let medianReturnPct = 0;
  if (totalTrades > 0) {
    const sorted = [...returns].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    medianReturnPct =
      sorted.length % 2 !== 0 ? sorted[mid] : parseFloat(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
  }

  const bestTradePct = totalTrades > 0 ? Math.max(...returns) : 0;
  const worstTradePct = totalTrades > 0 ? Math.min(...returns) : 0;

  const grossGains = trades.filter((t) => t.netReturnPct > 0).reduce((acc, t) => acc + t.netReturnPct, 0);
  const grossLosses = Math.abs(
    trades.filter((t) => t.netReturnPct <= 0).reduce((acc, t) => acc + t.netReturnPct, 0)
  );
  const profitFactor =
    grossLosses > 0 ? parseFloat((grossGains / grossLosses).toFixed(2)) : grossGains > 0 ? 99.0 : 0;

  // Calculate Equity Curve and Drawdown
  const equityCurve: EquityPoint[] = [];
  let strategyCapital = 100.0;
  const initialBenchmarkPrice = activeBars[0].close;
  let peakStrategyCapital = 100.0;
  let maxDrawdownPct = 0;

  // Map each trade's active date range for the equity timeline
  const activeTradeMap = new Map<string, Trade>();
  for (const trade of trades) {
    // Find bars between entry and exit
    activeBars.forEach((bar) => {
      if (bar.date >= trade.entryDate && bar.date <= trade.exitDate) {
        activeTradeMap.set(bar.date, trade);
      }
    });
  }

  // Iterate chronologically to construct equity curve
  let currentActiveTrade: Trade | null = null;
  let tradeHoldingDaysCount = 0;

  for (let b = 0; b < activeBars.length; b++) {
    const bar = activeBars[b];
    const benchmarkVal = parseFloat(((bar.close / initialBenchmarkPrice) * 100).toFixed(2));

    // Check if this date completes a trade
    const completedTrade = trades.find((t) => t.exitDate === bar.date);
    if (completedTrade) {
      strategyCapital = strategyCapital * (1 + completedTrade.netReturnPct / 100);
    }

    if (strategyCapital > peakStrategyCapital) {
      peakStrategyCapital = strategyCapital;
    }
    const currentDrawdown = ((peakStrategyCapital - strategyCapital) / peakStrategyCapital) * 100;
    if (currentDrawdown > maxDrawdownPct) {
      maxDrawdownPct = currentDrawdown;
    }

    equityCurve.push({
      date: bar.date,
      strategyValue: parseFloat(strategyCapital.toFixed(2)),
      benchmarkValue: benchmarkVal,
      inPosition: activeTradeMap.has(bar.date),
    });
  }

  const strategyCumulativeReturnPct = parseFloat((strategyCapital - 100.0).toFixed(2));
  const finalBenchmarkVal = equityCurve[equityCurve.length - 1]?.benchmarkValue || 100;
  const benchmarkCumulativeReturnPct = parseFloat((finalBenchmarkVal - 100.0).toFixed(2));

  return {
    config,
    totalBars: activeBars.length,
    totalSignals,
    totalTrades,
    winCount,
    lossCount,
    winRatePct,
    avgReturnPct,
    medianReturnPct,
    bestTradePct,
    worstTradePct,
    profitFactor,
    strategyCumulativeReturnPct,
    benchmarkCumulativeReturnPct,
    maxDrawdownPct: parseFloat(maxDrawdownPct.toFixed(2)),
    trades,
    equityCurve,
    hasLookAheadBiasWarning: isLookAhead,
    lookAheadBiasExplanation: isLookAhead
      ? 'Look-Ahead Bias Alert: Entering on the Same Day Close assumes you can trade at the closing price at the exact moment the market closes and confirms the drop. In real trading, you cannot execute at the close after observing the close. True realistic execution requires entering on the Next Trading Day Open.'
      : undefined,
  };
}

function createEmptyResult(config: ExperimentConfig): BacktestResult {
  return {
    config,
    totalBars: 0,
    totalSignals: 0,
    totalTrades: 0,
    winCount: 0,
    lossCount: 0,
    winRatePct: 0,
    avgReturnPct: 0,
    medianReturnPct: 0,
    bestTradePct: 0,
    worstTradePct: 0,
    profitFactor: 0,
    strategyCumulativeReturnPct: 0,
    benchmarkCumulativeReturnPct: 0,
    maxDrawdownPct: 0,
    trades: [],
    equityCurve: [],
    hasLookAheadBiasWarning: false,
  };
}
