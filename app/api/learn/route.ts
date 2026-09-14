import { NextRequest, NextResponse } from 'next/server';
import { generateDeterministicLearningReport } from '@/lib/learn';
import { BacktestResult, LearningReport } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { result }: { result: BacktestResult } = await req.json();

    if (!result || !result.config) {
      return NextResponse.json({ error: 'Backtest result is required' }, { status: 400 });
    }

    // Generate local deterministic report as baseline/fallback
    const deterministicReport = generateDeterministicLearningReport(result);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        report: deterministicReport,
        source: 'deterministic',
        message: 'No GEMINI_API_KEY configured. Report generated via deterministic analytical engine.',
      });
    }

    try {
      const prompt = `You are a rigorous quantitative trading researcher. You are analyzing the results of a backtest on NIFTY 50.
Do NOT perform numerical calculations (they are already completed deterministically below).
Do NOT make exaggerated claims such as "this strategy is profitable" unless the data firmly supports it, and qualify it.

Experiment:
Condition: ${result.config.conditionDescription}
Entry: ${result.config.entryRule}
Holding Days: ${result.config.holdingDays}
Period: ${result.config.startDate} to ${result.config.endDate}
Friction: ${result.config.slippagePct * 2}% slippage, ${result.config.transactionCostPct * 2}% round-trip fees.

Results:
Total Signals: ${result.totalSignals}
Executed Trades: ${result.totalTrades}
Win Rate: ${result.winRatePct}% (${result.winCount} Wins / ${result.lossCount} Losses)
Average Return: ${result.avgReturnPct}%
Median Return: ${result.medianReturnPct}%
Best Trade: +${result.bestTradePct}%
Worst Trade: ${result.worstTradePct}%
Profit Factor: ${result.profitFactor}
Max Drawdown: -${result.maxDrawdownPct}%
Cumulative Strategy Return: ${result.strategyCumulativeReturnPct}%
Benchmark Return (Buy & Hold NIFTY): +${result.benchmarkCumulativeReturnPct}%
Has Look-Ahead Bias: ${result.hasLookAheadBiasWarning}

Please produce a structured learning synthesis JSON object with this exact structure:
{
  "dataObservations": ["string list of 4-5 pure factual observations strictly based on the numbers"],
  "systemInterpretation": ["string list of 2-3 market/behavioral interpretations explaining why these numbers occurred"],
  "caveats": ["string list of 4-5 critical limitations (sample size, market regime, lack of stop-loss, slippage realities)"],
  "conclusion": "A cautious, honest, scientific conclusion summarizing whether this strategy works and its role.",
  "nextInvestigations": ["3-4 specific follow-up hypothesis questions to test next"]
}
Only return valid JSON.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonText) {
          const parsed = JSON.parse(jsonText);
          const aiReport: LearningReport = {
            dataObservations: parsed.dataObservations || deterministicReport.dataObservations,
            systemInterpretation: parsed.systemInterpretation || deterministicReport.systemInterpretation,
            caveats: parsed.caveats || deterministicReport.caveats,
            conclusion: parsed.conclusion || deterministicReport.conclusion,
            nextInvestigations: parsed.nextInvestigations || deterministicReport.nextInvestigations,
            isAiGenerated: true,
          };

          return NextResponse.json({
            success: true,
            report: aiReport,
            source: 'gemini',
          });
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed for /api/learn, using fallback:', err);
    }

    return NextResponse.json({
      success: true,
      report: deterministicReport,
      source: 'deterministic',
      message: 'LLM unavailable; completed using deterministic analytical report.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
