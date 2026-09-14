import React from 'react';
import { Step } from '@/lib/types';
import { Check, HelpCircle, Filter, FileText, Activity, BookOpen } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: Step;
  onSelectStep: (step: Step) => void;
  maxReachedStep: Step;
}

const STEPS: { key: Step; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { key: 'ASK', label: '1. ASK', icon: HelpCircle, description: 'Natural Language Question' },
  { key: 'CLARIFY', label: '2. CLARIFY', icon: Filter, description: 'Resolve Ambiguities' },
  { key: 'DEFINE', label: '3. DEFINE', icon: FileText, description: 'Structured Experiment' },
  { key: 'TEST', label: '4. TEST', icon: Activity, description: 'Deterministic Backtest' },
  { key: 'LEARN', label: '5. LEARN', icon: BookOpen, description: 'Synthesize & Conclude' },
];

const STEP_ORDER: Step[] = ['ASK', 'CLARIFY', 'DEFINE', 'TEST', 'LEARN'];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onSelectStep, maxReachedStep }) => {
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const maxIndex = STEP_ORDER.indexOf(maxReachedStep);

  return (
    <nav aria-label="Progress" className="w-full bg-[#0d1424] border border-slate-800 rounded-xl p-3 shadow-lg">
      <ol className="grid grid-cols-5 gap-2">
        {STEPS.map((step, idx) => {
          const isCurrent = step.key === currentStep;
          const isCompleted = idx < currentIndex;
          const isAccessible = idx <= maxIndex;
          const Icon = step.icon;

          return (
            <li key={step.key} className="relative">
              <button
                disabled={!isAccessible}
                onClick={() => isAccessible && onSelectStep(step.key)}
                className={`w-full text-left p-2.5 rounded-lg transition-all flex flex-col items-start gap-1.5 ${
                  isCurrent
                    ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 shadow-md shadow-cyan-950/30'
                    : isCompleted
                    ? 'bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    : 'opacity-50 cursor-not-allowed bg-slate-950/40 border border-transparent text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : isCurrent
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase">{step.key}</span>
                  </div>
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent ? 'text-cyan-400' : isCompleted ? 'text-emerald-400/80' : 'text-slate-600'
                    }`}
                  />
                </div>
                <div className="hidden sm:block text-[11px] text-slate-400 truncate w-full">
                  {step.description}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
