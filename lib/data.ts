import fs from 'fs';
import path from 'path';
import { PriceBar } from './types';

let cachedBars: PriceBar[] | null = null;

export function parseCSV(csvContent: string): PriceBar[] {
  const lines = csvContent.trim().split('\n');
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const dateIdx = headers.indexOf('date');
  const openIdx = headers.indexOf('open');
  const highIdx = headers.indexOf('high');
  const lowIdx = headers.indexOf('low');
  const closeIdx = headers.indexOf('close');
  const volIdx = headers.indexOf('volume');

  const bars: PriceBar[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(',');
    if (parts.length < 5) continue;

    const bar: PriceBar = {
      date: parts[dateIdx]?.trim() || '',
      open: parseFloat(parts[openIdx]),
      high: parseFloat(parts[highIdx]),
      low: parseFloat(parts[lowIdx]),
      close: parseFloat(parts[closeIdx]),
      volume: volIdx !== -1 ? parseFloat(parts[volIdx]) : 0,
    };

    if (!isNaN(bar.open) && !isNaN(bar.close) && bar.date) {
      bars.push(bar);
    }
  }

  // Sort chronologically
  bars.sort((a, b) => (a.date > b.date ? 1 : -1));

  // Compute daily return percentage (close to close)
  for (let i = 0; i < bars.length; i++) {
    if (i === 0) {
      bars[i].changePct = 0;
    } else {
      const prev = bars[i - 1].close;
      bars[i].changePct = ((bars[i].close - prev) / prev) * 100;
    }
  }

  return bars;
}

export function getNiftyHistoricalData(): PriceBar[] {
  if (cachedBars) {
    return cachedBars;
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'nifty_sample.csv');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      cachedBars = parseCSV(fileContent);
      return cachedBars;
    }
  } catch (err) {
    console.error('Error reading nifty_sample.csv:', err);
  }

  return [];
}
