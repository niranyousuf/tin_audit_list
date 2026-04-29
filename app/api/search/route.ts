import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

type TinRecord = {
  tin: string;
  zone: string;
  circle: string;
  submissionType: string;
};

// Load records once at module level (cached for all requests)
let recordsCache: TinRecord[] | null = null;
let recordMapCache: Map<string, TinRecord> | null = null;

function getRecords(): TinRecord[] {
  if (!recordsCache) {
    const filePath = path.join(process.cwd(), 'public', 'tins.json');
    const raw = readFileSync(filePath, 'utf-8');
    const records: TinRecord[] = JSON.parse(raw);
    recordsCache = records;
    recordMapCache = new Map(records.map((record) => [record.tin, record]));
  }
  return recordsCache;
}

function getRecordMap(): Map<string, TinRecord> {
  getRecords();
  return recordMapCache!;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? '';
  const tin = req.nextUrl.searchParams.get('tin')?.trim();

  // Real-time prefix search suggestions (up to 10)
  if (q) {
    if (!/^\d{1,12}$/.test(q)) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = getRecords()
      .filter((record) => record.tin.startsWith(q))
      .slice(0, 10)
      .map((record) => ({
        tin: record.tin,
        zone: record.zone,
        circle: record.circle,
        submissionType: record.submissionType,
      }));

    return NextResponse.json({ suggestions });
  }

  // Exact TIN check
  if (!tin || !/^\d{12}$/.test(tin)) {
    return NextResponse.json({ error: 'Invalid TIN' }, { status: 400 });
  }

  const match = getRecordMap().get(tin);
  return NextResponse.json({
    found: Boolean(match),
    match: match ?? null,
  });
}