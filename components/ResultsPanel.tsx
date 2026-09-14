import React, { useState } from 'react';
import { BacktestResult, LearningReport, ExperimentConfig } from '@/lib/types';
import {
  Activity,
  BookOpen,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface ResultsPanelProps {
  result: BacktestResult;
  report: LearningReport;
  onModifyConfig: (config: ExperimentConfig) => void;
  onNewQuestion: () => void;
  onReRunTest: () => void;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  result,
  report,
  onModifyConfig,
  onNewQuestion,
  onReRunTest,
}) => {
  const [activeTab, setActiveTab] = useState<'TEST' | 'LEARN'>('TEST');
  const [tradeFilter, setTradeFilter] = useState<'ALL' | 'WINS' | 'LOSSES'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    totalSignals,
    totalTrades,
    winRatePct,
    avgReturnPct,
    medianReturnPct,
    bestTradePct,
    worstTradePct,
    profitFactor,
    maxDrawdownPct,
    strategyCumulativeReturnPct,
    benchmarkCumulativeReturnPct,
    hasLookAheadBiasWarning,
    lookAheadBiasExplanation,
    trades,
    equityCurve,
    config,
  } = result;

  // Filter trades
  const filteredTrades = trades.filter((t) => {
    if (tradeFilter === 'WINS') return t.isWin;
    if (tradeFilter === 'LOSSES') return !t.isWin;
    return true;
  });

  const totalPages = Math.ceil(filteredTrades.length / pageSize) || 1;
  const paginatedTrades = filteredTrades.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // SVG Equity Curve calculations
  const renderEquityChart = () => {
    if (!equityCurve || equityCurve.length < 5) return null;

    // Sample down equity points for smooth rendering
    const step = Math.max(1, Math.floor(equityCurve.length / 200));
    const points = equityCurve.filter((_, idx) => idx % step === 0 || idx === equityCurve.length - 1);

    const minVal = Math.min(...points.map((p) => Math.min(p.strategyValue, p.benchmarkValue))) * 0.95;
    const maxVal = Math.max(...points.map((p) => Math.max(p.strategyValue, p.benchmarkValue))) * 1.05;

    const width = 800;
    const height = 240;
    const padding = { top: 20, right: 30, bottom: 30, left: 50 };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const getX = (idx: number) => padding.left + (idx / (points.length - 1)) * chartWidth;
    const getY = (val: number) => padding.top + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;

    const stratPath = points
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx).toFixed(1)} ${getY(p.strategyValue).toFixed(1)}`)
      .join(' ');

    const benchPath = points
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx).toFixed(1)} ${getY(p.benchmarkValue).toFixed(1)}`)
      .join(' ');

    const baselineY = getY(100.0);

    return (
      <div className="w-full overflow-hidden bg-slate-950/80 rounded-xl p-4 border border-slate-800 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-200">
              Equity Trajectory vs Benchmark (Rebased to 100.0)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-cyan-400 rounded-full" />
              <span className="text-cyan-300 font-medium">
                Strategy ({strategyCumulativeReturnPct > 0 ? '+' : ''}{strategyCumulativeReturnPct}%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-slate-500 rounded-full" />
              <span className="text-slate-400">
                Buy &amp; Hold Benchmark ({benchmarkCumulativeReturnPct > 0 ? '+' : ''}{benchmarkCumulativeReturnPct}%)
              </span>
            </div>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Baseline 100 grid line */}
          <line
            x1={padding.left}
            y1={baselineY}
            x2={width - padding.right}
            y2={baselineY}
            stroke="#334155"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <text
            x={padding.left - 8}
            y={baselineY + 4}
            fill="#64748b"
            fontSize="10"
            textAnchor="end"
            fontFamily="monospace"
          >
            100.0
          </text>

          {/* Benchmark Line (Slate) */}
          <path d={benchPath} fill="none" stroke="#64748b" strokeWidth="1.5" strokeOpacity="0.8" />

          {/* Strategy Line (Cyan) */}
          <path d={stratPath} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

          {/* Start and End labels */}
          <text
            x={padding.left}
            y={height - 10}
            fill="#64748b"
            fontSize="10"
            fontFamily="monospace"
          >
            {points[0]?.date}
          </text>
          <text
            x={width - padding.right}
            y={height - 10}
            fill="#64748b"
            fontSize="10"
            textAnchor="end"
            fontFamily="monospace"
          >
            {points[points.length - 1]?.date}
          </text>
        </svg>

        <div className="text-[10px] text-slate-500 mt-2 text-right">
          Normalized baseline = 100.0 | Net of modeled fees &amp; slippage
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Stage Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          Stages 4 &amp; 5: Test Execution &amp; Analytical Synthesis
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Backtest Results &amp; Research Insights
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Deterministic execution completed over {result.totalBars} daily bars. Review the numerical evidence and the structured scientific interpretation.
        </p>
      </div>

      {/* Look-Ahead Warning Banner if applicable */}
      {hasLookAheadBiasWarning && (
        <div className="flex items-start gap-3 bg-rose-950/60 border border-rose-600 rounded-xl p-4 text-rose-200 text-xs">
          <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <div>
            <strong className="block text-sm font-bold text-rose-100">
              Look-Ahead Bias Active in This Run
            </strong>
            {lookAheadBiasExplanation}
          </div>
        </div>
      )}

      {/* Sub-Tabs: TEST vs LEARN */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('TEST')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'TEST'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Quantitative Results (TEST)</span>
          </button>

          <button
            onClick={() => setActiveTab('LEARN')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'LEARN'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Research Synthesis (LEARN)</span>
            {report.isAiGenerated && (
              <span className="text-[10px] bg-slate-900 text-cyan-300 px-1.5 py-0.5 rounded ml-1 border border-cyan-800 font-mono">
                AI
              </span>
            )}
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>Historical Sample (2018–2024)</span>
        </div>
      </div>

      {activeTab === 'TEST' ? (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Win Rate */}
            <div className="bg-[#0d1424] border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Win Rate</span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-2xl font-bold font-mono-num ${
                    winRatePct >= 50 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {winRatePct}%
                </span>
                <span className="text-[11px] text-slate-500 font-mono-num">
                  ({result.winCount}W / {result.lossCount}L)
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                {winRatePct >= 50 ? 'Positive win frequency' : 'Under 50% hit rate'}
              </div>
            </div>

            {/* Average Return */}
            <div className="bg-[#0d1424] border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Avg Return / Trade</span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-2xl font-bold font-mono-num ${
                    avgReturnPct > 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {avgReturnPct > 0 ? '+' : ''}
                  {avgReturnPct}%
                </span>
                <span className="text-[11px] text-slate-500 font-mono-num">
                  med: {medianReturnPct}%
                </span>
              </div>
              <div className="text-[11px] text-slate-500">Net of slippage &amp; STT</div>
            </div>

            {/* Total Signals & Executed Trades */}
            <div className="bg-[#0d1424] border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Trades Executed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-100 font-mono-num">
                  {totalTrades}
                </span>
                <span className="text-[11px] text-slate-500 font-mono-num">
                  ({totalSignals} signals)
                </span>
              </div>
              <div className="text-[11px] text-slate-500">Non-overlapping allocation</div>
            </div>

            {/* Profit Factor & Max DD */}
            <div className="bg-[#0d1424] border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Profit Factor / Max DD</span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-2xl font-bold font-mono-num ${
                    profitFactor >= 1.2 ? 'text-emerald-400' : 'text-slate-200'
                  }`}
                >
                  {profitFactor}
                </span>
                <span className="text-[11px] text-rose-400 font-mono-num">
                  -{maxDrawdownPct}% DD
                </span>
              </div>
              <div className="text-[11px] text-slate-500">Gross wins / Gross losses</div>
            </div>
          </div>

          {/* Secondary Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-num">
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
              <span className="text-slate-400">Best Trade:</span>
              <span className="text-emerald-400 font-bold">+{bestTradePct}%</span>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
              <span className="text-slate-400">Worst Trade:</span>
              <span className="text-rose-400 font-bold">{worstTradePct}%</span>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
              <span className="text-slate-400">Strategy vs Benchmark:</span>
              <span className="text-slate-200">
                <strong className="text-cyan-400">
                  {strategyCumulativeReturnPct > 0 ? '+' : ''}
                  {strategyCumulativeReturnPct}%
                </strong>{' '}
                vs +{benchmarkCumulativeReturnPct}%
              </span>
            </div>
          </div>

          {/* Interactive Equity Curve Chart */}
          {renderEquityChart()}

          {/* Trade Log Table */}
          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Chronological Trade Log</h3>
                <p className="text-xs text-slate-400">
                  Signals confirmed at Day T close &rarr; executed at Day T+1 open &rarr; exited at Day T+1+{config.holdingDays}.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                {(['ALL', 'WINS', 'LOSSES'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setTradeFilter(filter);
                      setCurrentPage(1);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      tradeFilter === filter
                        ? 'bg-cyan-950 border border-cyan-500/60 text-cyan-300'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-num">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Signal Date</th>
                    <th className="py-2.5 px-3">Trigger Drop</th>
                    <th className="py-2.5 px-3">Entry (T+1 Open)</th>
                    <th className="py-2.5 px-3">Exit Price</th>
                    <th className="py-2.5 px-3">Holding</th>
                    <th className="py-2.5 px-3 text-right">Net Return</th>
                    <th className="py-2.5 px-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {paginatedTrades.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 italic">
                        No trades found for this filter.
                      </td>
                    </tr>
                  ) : (
                    paginatedTrades.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-2.5 px-3 text-slate-500 font-sans">{t.id}</td>
                        <td className="py-2.5 px-3 text-slate-300">{t.signalDate}</td>
                        <td className="py-2.5 px-3 text-rose-400 font-semibold">{t.signalDropPct}%</td>
                        <td className="py-2.5 px-3 text-slate-300">
                          <div>₹{t.entryPrice.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{t.entryDate}</div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">
                          <div>₹{t.exitPrice.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{t.exitDate}</div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">{t.holdingDays}d</td>
                        <td
                          className={`py-2.5 px-3 text-right font-bold ${
                            t.netReturnPct > 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {t.netReturnPct > 0 ? '+' : ''}
                          {t.netReturnPct}%
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                              t.isWin
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {t.isWin ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {t.isWin ? 'WIN' : 'LOSS'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span>
                  Showing {(currentPage - 1) * pageSize + 1} to{' '}
                  {Math.min(currentPage * pageSize, filteredTrades.length)} of {filteredTrades.length} trades
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 py-1 rounded border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                  >
                    Prev
                  </button>
                  <span className="px-2 text-slate-400">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-2.5 py-1 rounded border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* LEARN STAGE */
        <div className="space-y-6">
          {/* Methodology Banner */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>
                <strong>Epistemological Standard:</strong> Strict separation of{' '}
                <span className="text-cyan-300 font-semibold">Data (Facts)</span> &rarr;{' '}
                <span className="text-amber-300 font-semibold">Interpretation</span> &rarr;{' '}
                <span className="text-rose-300 font-semibold">Caveats</span> &rarr;{' '}
                <span className="text-emerald-300 font-semibold">Conclusion</span>.
              </span>
            </div>
            {report.isAiGenerated && (
              <span className="text-[10px] bg-cyan-950 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded">
                AI Synthesis Active
              </span>
            )}
          </div>

          {/* 1. What the Data Shows */}
          <div className="bg-[#0d1424] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">
                1
              </span>
              <h2 className="text-base font-bold text-white">What the Data Shows (Factual Observations)</h2>
            </div>
            <p className="text-xs text-slate-400">
              Direct mathematical findings from the sample dataset without speculation or spin.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {report.dataObservations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                  <span className="text-cyan-400 font-bold mt-0.5">&bull;</span>
                  <span className="leading-relaxed">{obs}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. System Interpretation */}
          <div className="bg-[#0d1424] border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                2
              </span>
              <h2 className="text-base font-bold text-white">System Interpretation (Economic &amp; Behavioral Logic)</h2>
            </div>
            <p className="text-xs text-slate-400">
              Explaining the market mechanisms that likely caused these observations.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {report.systemInterpretation.map((interp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                  <span className="text-amber-400 font-bold mt-0.5">&bull;</span>
                  <span className="leading-relaxed">{interp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Caveats & Critical Limitations */}
          <div className="bg-[#0d1424] border border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold font-mono">
                3
              </span>
              <h2 className="text-base font-bold text-white">Caveats &amp; Statistical Limitations</h2>
            </div>
            <p className="text-xs text-slate-400">
              Why you should be cautious about generalizing these results to live trading.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {report.caveats.map((cav, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                  <span className="text-rose-400 font-bold mt-0.5">&bull;</span>
                  <span className="leading-relaxed">{cav}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Cautious Conclusion */}
          <div className="bg-[#0d1424] border border-emerald-500/40 rounded-2xl p-6 space-y-3 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                4
              </span>
              <h2 className="text-base font-bold text-white">Pragmatic Conclusion</h2>
            </div>
            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 text-slate-100 text-xs sm:text-sm leading-relaxed font-sans">
              {report.conclusion}
            </div>
          </div>

          {/* 5. Next Investigations */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Recommended Follow-Up Investigations</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {report.nextInvestigations.map((inv, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 flex flex-col justify-between gap-3 hover:border-slate-700 transition-all"
                >
                  <p>{inv}</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (inv.includes('10-day') || inv.includes('10')) {
                        onModifyConfig({ ...config, holdingDays: 10 });
                      } else if (inv.includes('3-day') || inv.includes('3')) {
                        onModifyConfig({ ...config, holdingDays: 3 });
                      } else if (inv.includes('2.0%') || inv.includes('2%')) {
                        onModifyConfig({ ...config, fallThresholdPct: 2.0 });
                      } else {
                        onModifyConfig({ ...config, fallThresholdPct: 4.0 });
                      }
                    }}
                    className="self-start text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <span>Configure Hypothesis &rarr;</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={() => onModifyConfig(config)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Modify Parameters (Stage 3: DEFINE)</span>
        </button>

        <button
          type="button"
          onClick={onNewQuestion}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
        >
          <span>Ask Another Research Question</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
