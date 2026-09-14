import { NextRequest, NextResponse } from 'next/server';
import { analyzeResearchQuestion } from '@/lib/clarify';
import { UserInputAnalysis } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Deterministic heuristic baseline as default / fallback
    const heuristicAnalysis = analyzeResearchQuestion(question);

    if (!apiKey) {
      // Return heuristic analysis with transparent source label
      return NextResponse.json({
        success: true,
        analysis: heuristicAnalysis,
        source: 'heuristic',
        message: 'No GEMINI_API_KEY configured. Running in offline deterministic parsing mode.',
      });
    }

    // If API key is present, attempt LLM enhancement
    try {
      const prompt = `You are an expert quantitative researcher. Analyze this trading research question:
"${question}"

Break down:
1. What the user explicitly stated (instrument, action, any numbers)
2. What key parameters are missing or ambiguous (e.g. definition of sharp fall %, timeframe, holding period, entry rule, costs)
3. Propose standard quantitative default assumptions

Respond with a JSON object matching this TypeScript interface:
{
  "instrument": "NIFTY 50",
  "userSpecified": {
    "instrumentDetected": "NIFTY 50",
    "fallMagnitude": number or null,
    "holdingDays": number or null,
    "action": "BUY"
  },
  "systemAssumptions": {
    "fallThresholdPct": 3.0,
    "fallWindow": "1_DAY",
    "entryRule": "NEXT_OPEN",
    "holdingDays": 5,
    "transactionCostPct": 0.05,
    "slippagePct": 0.05,
    "testPeriod": "2018-01-01 to 2024-01-15 (Sample Historical Dataset)"
  }
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
          const mergedAnalysis: UserInputAnalysis = {
            ...heuristicAnalysis,
            instrument: parsed.instrument || heuristicAnalysis.instrument,
            userSpecified: {
              ...heuristicAnalysis.userSpecified,
              ...(parsed.userSpecified || {}),
            },
            systemAssumptions: {
              ...heuristicAnalysis.systemAssumptions,
              ...(parsed.systemAssumptions || {}),
            },
          };

          return NextResponse.json({
            success: true,
            analysis: mergedAnalysis,
            source: 'gemini',
          });
        }
      }
    } catch (llmError) {
      console.warn('Gemini API call failed, falling back to heuristic:', llmError);
    }

    return NextResponse.json({
      success: true,
      analysis: heuristicAnalysis,
      source: 'heuristic',
      message: 'LLM unavailable; completed using deterministic heuristic analysis.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
