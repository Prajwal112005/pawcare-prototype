'use client';

import React, { useState } from 'react';
import { Step, UserInputAnalysis, ExperimentConfig, BacktestResult, LearningReport } from '@/lib/types';
import { StepIndicator } from '@/components/StepIndicator';
import { QuestionInput } from '@/components/QuestionInput';
import { ClarifyPanel } from '@/components/ClarifyPanel';
import { ExperimentCard } from '@/components/ExperimentCard';
import { ResultsPanel } from '@/components/ResultsPanel';
import { analyzeResearchQuestion, buildExperimentConfig } from '@/lib/clarify';
import { runBacktest } from '@/lib/backtest';
import { generateDeterministicLearningReport } from '@/lib/learn';
import { Cpu, Terminal, Shield, Sparkles, Database } from 'lucide-react';

export default function Home() {
  const [step, setStep] = useState<Step>('ASK');
  const [maxReachedStep, setMaxReachedStep] = useState<Step>('ASK');
  const [question, setQuestion] = useState<string>('Does buying NIFTY after a sharp fall work?');
  const [analysis, setAnalysis] = useState<UserInputAnalysis | null>(null);
  const [config, setConfig] = useState<ExperimentConfig | null>(null);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [report, setReport] = useState<LearningReport | null>(null);
  const [aiSource, setAiSource] = useState<string>('heuristic');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const advanceStep = (nextStep: Step) => {
    setStep(nextStep);
    const order: Step[] = ['ASK', 'CLARIFY', 'DEFINE', 'TEST', 'LEARN'];
    const currentMaxIdx = order.indexOf(maxReachedStep);
    const nextIdx = order.indexOf(nextStep);
    if (nextIdx > currentMaxIdx) {
      setMaxReachedStep(nextStep);
    }
  };

  // Handler for Stage 1: ASK -> CLARIFY
  const handleQuestionSubmit = async (submittedQuestion: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setQuestion(submittedQuestion);

    try {
      const res = await fetch('/api/clarify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: submittedQuestion }),
      });

      if (!res.ok) {
        throw new Error('Failed to analyze question');
      }

      const data = await res.json();
      setAnalysis(data.analysis);
      setAiSource(data.source || 'heuristic');

      // Build initial config
      const initialConfig = buildExperimentConfig(data.analysis);
      setConfig(initialConfig);

      advanceStep('CLARIFY');
    } catch (err: any) {
      console.warn('Clarify API error, using client-side fallback:', err);
      // Seamless client-side fallback
      const fallbackAnalysis = analyzeResearchQuestion(submittedQuestion);
      setAnalysis(fallbackAnalysis);
      setAiSource('heuristic');
      const initialConfig = buildExperimentConfig(fallbackAnalysis);
      setConfig(initialConfig);
      advanceStep('CLARIFY');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for Stage 2: CLARIFY -> DEFINE
  const handleClarifyConfirm = (confirmedConfig: ExperimentConfig) => {
    setConfig(confirmedConfig);
    advanceStep('DEFINE');
  };

  // Handler for Stage 3: DEFINE -> TEST & LEARN
  const handleRunBacktest = async (finalConfig: ExperimentConfig) => {
    setIsLoading(true);
    setErrorMessage(null);
    setConfig(finalConfig);

    try {
      // 1. Run Backtest
      const backtestRes = await fetch('/api/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalConfig),
      });

      if (!backtestRes.ok) {
        throw new Error('Backtest execution failed');
      }

      const backtestData = await backtestRes.json();
      const testResult: BacktestResult = backtestData.result;
      setResult(testResult);

      // 2. Generate Learning Report
      try {
        const learnRes = await fetch('/api/learn', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ result: testResult }),
        });

        if (learnRes.ok) {
          const learnData = await learnRes.json();
          setReport(learnData.report);
        } else {
          // Fallback report
          const fallbackReport = generateDeterministicLearningReport(testResult);
          setReport(fallbackReport);
        }
      } catch (e) {
        const fallbackReport = generateDeterministicLearningReport(testResult);
        setReport(fallbackReport);
      }

      advanceStep('TEST');
    } catch (err: any) {
      console.error('Backtest error:', err);
      setErrorMessage(err.message || 'An error occurred during backtesting.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-[#0d1322]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-cyan-950/40">
              α
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">NIFTY AlphaLab</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  Research Prototype
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Disciplined Quantitative Hypothesis Engine (ASK → CLARIFY → DEFINE → TEST → LEARN)
              </p>
            </div>
          </div>

          {/* Engine Status Indicators */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-[11px]">NIFTY 50 (2018–2024)</span>
            </div>

            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono ${
                aiSource === 'gemini'
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
              title={
                aiSource === 'gemini'
                  ? 'Gemini LLM is active for NLP clarification and synthesis'
                  : 'Deterministic heuristic parser is active (no API key required)'
              }
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{aiSource === 'gemini' ? 'Gemini AI' : 'Deterministic Engine'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Step Navigation Indicator */}
        <StepIndicator
          currentStep={step}
          onSelectStep={(targetStep) => setStep(targetStep)}
          maxReachedStep={maxReachedStep}
        />

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-950/60 border border-rose-600 rounded-xl p-4 text-xs text-rose-200 flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-100 font-bold ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Step Views */}
        {step === 'ASK' && (
          <QuestionInput
            initialQuestion={question}
            onSubmit={handleQuestionSubmit}
            isLoading={isLoading}
          />
        )}

        {step === 'CLARIFY' && analysis && (
          <ClarifyPanel
            analysis={analysis}
            onConfirm={handleClarifyConfirm}
            onBack={() => setStep('ASK')}
          />
        )}

        {step === 'DEFINE' && config && (
          <ExperimentCard
            config={config}
            onRunTest={handleRunBacktest}
            onBack={() => setStep('CLARIFY')}
            isLoading={isLoading}
          />
        )}

        {(step === 'TEST' || step === 'LEARN') && result && report && (
          <ResultsPanel
            result={result}
            report={report}
            onModifyConfig={(newConf) => {
              setConfig(newConf);
              setStep('DEFINE');
            }}
            onNewQuestion={() => {
              setStep('ASK');
            }}
            onReRunTest={() => {
              if (config) handleRunBacktest(config);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090d16] py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Full-Stack Developer Intern &mdash; Thinking &amp; Building Challenge</span>
          <span className="font-mono text-[11px] text-slate-400">
            Sample Historical NIFTY 50 Dataset &bull; Zero Look-Ahead Bias Engine
          </span>
        </div>
      </footer>
    </div>
  );
}
