import React, { useState } from 'react';
import { UserInputAnalysis, FallWindow, EntryRule, ExperimentConfig } from '@/lib/types';
import { buildExperimentConfig } from '@/lib/clarify';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Settings2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Info,
  Sliders,
} from 'lucide-react';

interface ClarifyPanelProps {
  analysis: UserInputAnalysis;
  onConfirm: (config: ExperimentConfig) => void;
  onBack: () => void;
}

export const ClarifyPanel: React.FC<ClarifyPanelProps> = ({ analysis, onConfirm, onBack }) => {
  // Local state for user choices on ambiguities
  const [selectedThreshold, setSelectedThreshold] = useState<number>(
    analysis.systemAssumptions.fallThresholdPct || 3.0
  );
  const [selectedWindow, setSelectedWindow] = useState<FallWindow>(
    analysis.systemAssumptions.fallWindow || '1_DAY'
  );
  const [selectedEntryRule, setSelectedEntryRule] = useState<EntryRule>(
    analysis.systemAssumptions.entryRule || 'NEXT_OPEN'
  );
  const [selectedHoldingDays, setSelectedHoldingDays] = useState<number>(
    analysis.systemAssumptions.holdingDays || 5
  );
  const [selectedCostPct, setSelectedCostPct] = useState<number>(
    analysis.systemAssumptions.transactionCostPct || 0.05
  );
  const [selectedSlippagePct, setSelectedSlippagePct] = useState<number>(
    analysis.systemAssumptions.slippagePct || 0.05
  );

  const handleProceed = () => {
    const config = buildExperimentConfig(analysis, {
      fallThresholdPct: selectedThreshold,
      fallWindow: selectedWindow,
      entryRule: selectedEntryRule,
      holdingDays: selectedHoldingDays,
      transactionCostPct: selectedCostPct,
      slippagePct: selectedSlippagePct,
    });
    onConfirm(config);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-medium">
          <Settings2 className="w-3.5 h-3.5 text-amber-400" />
          Stage 2: Ambiguity Deconstruction & Parameter Calibration
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Clarify Ambiguous Requirements
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          We distinguish what you explicitly stated from what was unsaid. Confirm or tweak the baseline parameters before constructing the formal experiment.
        </p>
      </div>

      {/* 3-Tier Classification Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Tier 1: User Said */}
        <div className="bg-[#0d1424] border border-emerald-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. User Stated (Explicit)</span>
            </div>
            <p className="text-xs text-slate-400">
              Directly extracted from your query without extrapolation.
            </p>

            <div className="bg-slate-950/70 rounded-lg p-3 space-y-2 border border-slate-800 text-xs font-mono-num">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Instrument</span>
                <span className="text-emerald-300 font-medium">{analysis.instrument}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Action</span>
                <span className="text-emerald-300 font-medium">
                  {analysis.userSpecified.action === 'BUY' ? 'Buy / Long Position' : 'Short / Sell'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Trigger Phrase</span>
                <span className="text-slate-300 font-sans italic">&quot;sharp fall&quot;</span>
              </div>
              {analysis.userSpecified.fallMagnitude && (
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-sans">Specified Drop</span>
                  <span className="text-emerald-300 font-medium">{analysis.userSpecified.fallMagnitude}%</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-800/80">
            Detected verbatim from natural language.
          </div>
        </div>

        {/* Tier 2: System Assumption */}
        <div className="bg-[#0d1424] border border-amber-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Info className="w-4 h-4" />
              <span>2. System Assumptions</span>
            </div>
            <p className="text-xs text-slate-400">
              Proposed quantitative baseline parameters to resolve vagueness.
            </p>

            <div className="bg-slate-950/70 rounded-lg p-3 space-y-2 border border-slate-800 text-xs font-mono-num">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Baseline Threshold</span>
                <span className="text-amber-300 font-medium">&ge; {analysis.systemAssumptions.fallThresholdPct}% single day</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Holding Period</span>
                <span className="text-amber-300 font-medium">{analysis.systemAssumptions.holdingDays} Trading Days (1 Week)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Entry Execution</span>
                <span className="text-amber-300 font-medium">Next Day Market Open (T+1)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Friction Assumption</span>
                <span className="text-amber-300 font-medium">
                  {(analysis.systemAssumptions.transactionCostPct + analysis.systemAssumptions.slippagePct) * 2}% round trip
                </span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-800/80">
            Standard quantitative defaults; fully editable in column 3.
          </div>
        </div>

        {/* Tier 3: Needs Clarification */}
        <div className="bg-[#0d1424] border border-cyan-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>3. Needs Clarification</span>
            </div>
            <p className="text-xs text-slate-400">
              Parameters that could drastically change the statistical result.
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <span><strong>Magnitude:</strong> Is 2% enough to constitute a panic dip, or is 3% required?</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <span><strong>Time Window:</strong> Single-session flash drop vs 3-day cascade?</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <span><strong>Holding Horizon:</strong> Quick 3-day bounce vs 10-day swing recovery?</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <span><strong>Execution Timing:</strong> Open of T+1 to eliminate look-ahead bias.</span>
              </li>
            </ul>
          </div>
          <div className="text-[11px] text-cyan-400/80 mt-4 pt-3 border-t border-slate-800/80">
            Configure your choices below &darr;
          </div>
        </div>
      </div>

      {/* Interactive Clarification Controls */}
      <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Interactive Parameter Calibration</h2>
          </div>
          <span className="text-xs text-slate-400">All assumptions are explicitly confirmed before testing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fall Magnitude */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              1. Fall Drop Threshold (%)
            </label>
            <p className="text-xs text-slate-400">
              Minimum percentage decline in NIFTY to trigger a buy signal.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { val: 2.0, label: '2.0% Drop', desc: 'Frequent (30-60 events)' },
                { val: 3.0, label: '3.0% Drop', desc: 'Recommended panic' },
                { val: 5.0, label: '5.0% Drop', desc: 'Extreme rare crash' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setSelectedThreshold(opt.val)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedThreshold === opt.val
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Window */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              2. Drop Timeframe
            </label>
            <p className="text-xs text-slate-400">
              Does the percentage drop occur over a single session or multi-day window?
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { val: '1_DAY' as FallWindow, label: '1 Trading Day', desc: 'Single-session shock (Close vs prev Close)' },
                { val: '3_DAYS' as FallWindow, label: '3 Trading Days', desc: 'Multi-session cumulative cascade' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setSelectedWindow(opt.val)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedWindow === opt.val
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Holding Period */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              3. Holding Period (Days)
            </label>
            <p className="text-xs text-slate-400">
              Duration to stay invested before executing the exit order.
            </p>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { val: 3, label: '3 Days', desc: 'Fast bounce' },
                { val: 5, label: '5 Days', desc: '1 week hold' },
                { val: 10, label: '10 Days', desc: '2 weeks hold' },
                { val: 20, label: '20 Days', desc: '1 month hold' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setSelectedHoldingDays(opt.val)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedHoldingDays === opt.val
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Entry Execution (Anti-Lookahead) */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              4. Execution Timing (Anti-Lookahead)
            </label>
            <p className="text-xs text-slate-400">
              When is the buy order placed?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedEntryRule('NEXT_OPEN')}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  selectedEntryRule === 'NEXT_OPEN'
                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Next Day Open (T+1)</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">
                    Realistic
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Zero look-ahead bias. Orders execute at the opening bell after the drop is confirmed.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEntryRule('SAME_CLOSE')}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  selectedEntryRule === 'SAME_CLOSE'
                    ? 'bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Signal Day Close (T)</span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded font-mono">
                    Look-Ahead!
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Impossible in reality: you cannot trade at the close after observing the close price.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Look-Ahead Bias Warning if SAME_CLOSE is selected */}
        {selectedEntryRule === 'SAME_CLOSE' && (
          <div className="flex items-start gap-3 bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 text-rose-300 text-xs">
            <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold text-rose-200">
                Warning: Look-Ahead Bias Selected
              </strong>
              Executing at the Same Day Close introduces look-ahead bias because an algorithm cannot confirm that the market closed down 3% until the trading session has ended, at which point trading at that price is impossible. Choosing Next Day Open replicates authentic live execution.
            </div>
          </div>
        )}

        {/* Transaction Cost & Friction */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              5. Friction & Slippage Model
            </label>
            <span className="text-xs text-cyan-400 font-mono-num">
              Total Round-Trip Friction: {((selectedCostPct + selectedSlippagePct) * 2).toFixed(2)}%
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { cost: 0.05, slip: 0.05, label: 'Realistic (0.20% Round-Trip)', desc: '0.05% brokerage/STT + 0.05% slippage each leg' },
              { cost: 0.10, slip: 0.10, label: 'Conservative (0.40% Round-Trip)', desc: 'High volatility bid-ask spread & taxes' },
              { cost: 0.0, slip: 0.0, label: 'Zero Friction (0.00%)', desc: 'Theoretical gross numbers (unrealistic)' },
            ].map((f, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSelectedCostPct(f.cost);
                  setSelectedSlippagePct(f.slip);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedCostPct === f.cost && selectedSlippagePct === f.slip
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <div className="font-semibold text-xs text-slate-200">{f.label}</div>
                <div className="text-[10px] text-slate-500 mt-1">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 text-xs font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Question</span>
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950/40 transition-all"
          >
            <span>Define Structured Experiment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
