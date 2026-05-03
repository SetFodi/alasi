import { NextResponse } from 'next/server';
import { isAdminSession } from '@/lib/admin-auth';
import { savePricing, resetPricing } from '@/lib/pricing-store';
import type { PricingConfig } from '@/lib/pricing';

export const runtime = 'nodejs';

const PRICING_FIELDS = [
  'usdRate',
  'marginCoefficient',
  'systemTurkey',
  'systemGermany',
  'fabricAcrylic',
  'fabricPolyester',
  'motor',
] as const;

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { pricing?: PricingConfig; reset?: boolean }
    | null;
  if (!body) return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });

  try {
    if (body.reset) {
      await resetPricing();
      return NextResponse.json({ ok: true });
    }
    if (!body.pricing) {
      return NextResponse.json({ error: 'Missing pricing.' }, { status: 400 });
    }

    for (const f of PRICING_FIELDS) {
      const v = body.pricing[f];
      if (typeof v !== 'number' || !Number.isFinite(v) || v < 0) {
        return NextResponse.json({ error: `Invalid value for ${f}` }, { status: 400 });
      }
    }

    await savePricing(body.pricing);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Save failed.' },
      { status: 500 },
    );
  }
}
