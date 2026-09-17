import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query = '', area = 'Indiranagar' } = body;

    if (!query.trim()) {
      return NextResponse.json({
        success: false,
        message: 'Query parameter is required'
      }, { status: 400 });
    }

    const matchResult = await aiService.matchService(query, area);

    return NextResponse.json({
      success: true,
      match: matchResult
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to match service' },
      { status: 500 }
    );
  }
}
