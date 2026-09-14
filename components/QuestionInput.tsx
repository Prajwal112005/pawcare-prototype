import React, { useState } from 'react';
import { Sparkles, ArrowRight, HelpCircle, AlertCircle, TrendingDown } from 'lucide-react';

interface QuestionInputProps {
  initialQuestion?: string;
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const SAMPLE_QUESTIONS = [
  'Does buying NIFTY after a sharp fall work?',
  'Does buying NIFTY after a 2% single-day drop yield positive returns over 5 days?',
  'What happens if we buy NIFTY after a 5% crash and hold for 10 trading days?',
  'Is dip buying on NIFTY profitable with a 3-day holding period?',
];

export const QuestionInput: React.FC<QuestionInputProps> = ({
  initialQuestion = 'Does buying NIFTY after a sharp fall work?',
  onSubmit,
  isLoading,
}) => {
  const [question, setQuestion] = useState(initialQuestion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Stage Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Stage 1: Formulation & Querying
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Trading Hypothesis Ingestion
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          State your market idea in natural language. The research engine will deconstruct your question, isolate ambiguous terminology, and propose verifiable quantitative parameters.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Research Question
            </label>
            <div className="relative">
              <textarea
                id="question"
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Does buying NIFTY after a sharp fall work?"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-3.5 text-base text-slate-100 placeholder-slate-500 resize-none transition-all outline-none"
              />
              <TrendingDown className="absolute right-4 bottom-4 w-5 h-5 text-slate-600 pointer-events-none" />
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              Or try a sample hypothesis:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_QUESTIONS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQuestion(sample)}
                  className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all ${
                    question === sample
                      ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 font-medium'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-amber-400/90 bg-amber-950/30 border border-amber-800/40 px-3 py-1.5 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                <strong>System Principle:</strong> The prototype will not silently guess parameters. We clarify before testing.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-950/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Question...</span>
                </>
              ) : (
                <>
                  <span>Deconstruct & Clarify</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Educational Walkthrough Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4">
          <div className="text-cyan-400 font-semibold mb-1">1. Identify Missing Variables</div>
          What defines a &quot;sharp fall&quot;? 2%? 3%? 5%? Over 1 day or multiple days? We detect unstated thresholds.
        </div>
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4">
          <div className="text-amber-400 font-semibold mb-1">2. Anti-Lookahead Execution</div>
          If a signal occurs at today&apos;s close, buying today is a look-ahead fallacy. Real trading enters at tomorrow&apos;s open.
        </div>
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4">
          <div className="text-emerald-400 font-semibold mb-1">3. Realistic Friction</div>
          STT, exchange fees, and bid-ask slippage are explicitly integrated so paper wins aren&apos;t false illusions.
        </div>
      </div>
    </div>
  );
};
