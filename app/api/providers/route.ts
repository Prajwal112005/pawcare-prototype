import { NextRequest, NextResponse } from 'next/server';
import { BENGALURU_PROVIDERS } from '@/data/providers';
import { ProviderCategory } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') as ProviderCategory | 'all' | null;
  const emergencyOnly = searchParams.get('emergency') === 'true';
  const area = searchParams.get('area')?.toLowerCase() || '';

  let results = [...BENGALURU_PROVIDERS];

  if (query) {
    results = results.filter((p) =>
      p.name.toLowerCase().includes(query) ||
      p.area.toLowerCase().includes(query) ||
      p.services.some((s) => s.toLowerCase().includes(query)) ||
      p.about.toLowerCase().includes(query)
    );
  }

  if (category && category !== 'all') {
    if (category === 'emergency') {
      results = results.filter((p) => p.isEmergency24x7 || p.category === 'emergency');
    } else {
      results = results.filter((p) => p.category === category);
    }
  }

  if (emergencyOnly) {
    results = results.filter((p) => p.isEmergency24x7);
  }

  if (area) {
    results = results.filter((p) => p.area.toLowerCase().includes(area));
  }

  return NextResponse.json({
    total: results.length,
    city: 'Bengaluru',
    providers: results
  });
}
