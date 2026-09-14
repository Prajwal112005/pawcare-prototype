import React, { useState } from 'react';
import { ExperimentConfig, EntryRule } from '@/lib/types';
import {
  FileText,
  Play,
  ArrowLeft,
  Calendar,
  Layers,
  Percent,
  Clock,
  ShieldCheck,
  Edit3,
  Check,
  RotateCcw,
} from 'lucide-react';

interface ExperimentCardProps {
  config: ExperimentConfig;
  onRunTest: (finalConfig: ExperimentConfig) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({
  config,
  onRunTest,
  onBack,
  isLoading,
}) => {
  const [editableConfig, setEditableConfig] = useState<ExperimentConfig>({ ...config });
  const [isEditingHypothesis, setIsEditingHypothesis] = useState(false);

  const handleUpdate = <K extends keyof ExperimentConfig>(key: K, value: ExperimentConfig[K]) => {
    setEditableConfig((prev) => ({
      ...prev,
      [key]: value,
      // Update condition description if threshold or window changes
      conditionDescription:
        key === 'fallThresholdPct' || key === 'fallWindowDays'
          ? `${prev.instrument} drops >= ${
              key === 'fallThresholdPct' ? value : prev.fallThresholdPct
            }% in ${
              key === 'fallWindowDays' ? value : prev.fallWindowDays
            } trading day(s) (Close-to-Close)`
          : prev.conditionDescription,
    }));
  };

  const handleReset = () => {
    setEditableConfig({ ...config });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          Stage 3: Formal Experiment Specification
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Formalized Research Experiment
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          The natural language query is now converted into a mathematically rigorous, reproducible specification. Every parameter below is editable before running the deterministic test.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-[#0d1424] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-semibold block">
              EXPERIMENT ID: {editableConfig.id}
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Mean-Reversion Dip Buying on {editableConfig.instrument}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              title="Reset parameters to initial clarification"
              className="text-xs text-slate-400 hover:text-slate-200 p-2 rounded-lg bg-slate-900 border border-slate-800 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              Look-Ahead Shield Active
            </span>
          </div>
        </div>

        {/* Hypothesis Statement Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Hypothesis to Test
            </span>
            <button
              type="button"
              onClick={() => setIsEditingHypothesis(!isEditingHypothesis)}
              className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingHypothesis ? 'Done' : 'Edit Hypothesis'}</span>
            </button>
          </div>

          {isEditingHypothesis ? (
            <textarea
              rows={3}
              value={editableConfig.hypothesis}
              onChange={(e) => handleUpdate('hypothesis', e.target.value)}
              className="w-full bg-slate-900 border border-cyan-500/50 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
            />
          ) : (
            <p className="text-sm text-slate-200 italic leading-relaxed">
              &quot;{editableConfig.hypothesis}&quot;
            </p>
          )}
        </div>

        {/* Structured Parameter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Market / Instrument */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Market / Instrument</span>
            </div>
            <div className="text-base font-bold text-slate-100">{editableConfig.instrument}</div>
            <div className="text-[11px] text-slate-500">
              National Stock Exchange of India (NSE) 50 Benchmark Index
            </div>
          </div>

          {/* Condition / Signal */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-cyan-400" />
                <span>Condition / Trigger</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono-num">
                {editableConfig.fallThresholdPct}% / {editableConfig.fallWindowDays}d
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {editableConfig.conditionDescription}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-400">Edit threshold:</span>
              <div className="flex gap-1.5">
                {[2.0, 3.0, 4.0, 5.0].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleUpdate('fallThresholdPct', t)}
                    className={`px-2 py-0.5 rounded text-xs font-mono ${
                      editableConfig.fallThresholdPct === t
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Entry Rule */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Entry Execution Rule</span>
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  editableConfig.entryRule === 'NEXT_OPEN'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {editableConfig.entryRule === 'NEXT_OPEN' ? 'Zero Look-Ahead' : 'Look-Ahead!'}
              </span>
            </div>
            <select
              value={editableConfig.entryRule}
              onChange={(e) => handleUpdate('entryRule', e.target.value as EntryRule)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 mt-1 focus:outline-none focus:border-cyan-500"
            >
              <option value="NEXT_OPEN">Buy at Next Trading Day Market Open (Realistic T+1)</option>
              <option value="SAME_CLOSE">Buy at Signal Day Market Close (Theoretical T - Look-Ahead)</option>
            </select>
            <div className="text-[11px] text-slate-500">
              Orders placed after observing day T close execute at day T+1 open.
            </div>
          </div>

          {/* Exit Rule & Holding Period */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Exit Rule & Holding Period</span>
              </span>
              <span className="text-xs font-mono-num text-cyan-300 font-bold">
                {editableConfig.holdingDays} Trading Days
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-400">Holding Days:</span>
              <div className="flex gap-1.5">
                {[1, 3, 5, 10, 20].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleUpdate('holdingDays', d)}
                    className={`px-2.5 py-1 rounded text-xs font-mono ${
                      editableConfig.holdingDays === d
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-slate-500">
              Position exits at open of day T + 1 + {editableConfig.holdingDays}.
            </div>
          </div>

          {/* Test Period */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Historical Test Period</span>
            </div>
            <div className="text-sm font-semibold text-slate-100 font-mono-num">
              {editableConfig.startDate} to {editableConfig.endDate}
            </div>
            <div className="text-[11px] text-slate-500">
              1,576 daily sessions covering 2018–2024 (sample historical dataset).
            </div>
          </div>

          {/* Costs & Slippage */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-cyan-400" />
                <span>Transaction Costs & Slippage</span>
              </span>
              <span className="text-xs font-mono-num text-amber-300">
                {((editableConfig.transactionCostPct + editableConfig.slippagePct) * 2).toFixed(2)}% RT
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Brokerage + STT (leg)</span>
                <input
                  type="number"
                  step="0.01"
                  value={editableConfig.transactionCostPct}
                  onChange={(e) => handleUpdate('transactionCostPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Slippage (leg)</span>
                <input
                  type="number"
                  step="0.01"
                  value={editableConfig.slippagePct}
                  onChange={(e) => handleUpdate('slippagePct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 text-xs font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Clarifications</span>
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => onRunTest(editableConfig)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-950/50 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Executing Deterministic Backtest...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Run Deterministic Backtest</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
