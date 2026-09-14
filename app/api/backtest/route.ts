import { NextRequest, NextResponse } from 'next/server';
import { getNiftyHistoricalData } from '@/lib/data';
import { runBacktest } from '@/lib/backtest';
import { ExperimentConfig } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const config: ExperimentConfig = await req.json();

    if (!config || !config.instrument) {
      return NextResponse.json({ error: 'Valid experiment configuration is required' }, { status: 400 });
    }

    const bars = getNiftyHistoricalData();

    if (!bars || bars.length === 0) {
      return NextResponse.json(
        { error: 'Historical NIFTY data is not available on the server' },
        { status: 500 }
      );
    }

    const result = runBacktest(bars, config);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error('Backtest error:', error);
    return NextResponse.json({ error: error.message || 'Backtest failed' }, { status: 500 });
  }
}
