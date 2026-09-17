import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId = 'sample-cbc-max' } = body;

    const analysis = await aiService.simplifyReport(reportId);

    return NextResponse.json({
      success: true,
      analysis,
      guardrailNotice: 'This explanation is AI-generated and not a diagnosis. Always consult a certified veterinarian.'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to analyze report' },
      { status: 500 }
    );
  }
}
