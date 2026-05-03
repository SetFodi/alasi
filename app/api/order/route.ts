import { NextResponse } from 'next/server';
import { getPricing } from '@/lib/pricing-store';
import {
  calculatePrice,
  isValidDimensions,
  type CalculatorInput,
  type SystemType,
  type FabricType,
  type ControlType,
} from '@/lib/pricing';

export const runtime = 'nodejs';

interface OrderRequest extends CalculatorInput {
  name: string;
  phone: string;
}

function isValidSystem(v: unknown): v is SystemType {
  return v === 'turkey' || v === 'germany';
}
function isValidFabric(v: unknown): v is FabricType {
  return v === 'acrylic' || v === 'polyester';
}
function isValidControl(v: unknown): v is ControlType {
  return v === 'manual' || v === 'motorized';
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as OrderRequest | null;
  if (!body) return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
  }
  if (
    typeof body.width !== 'number' ||
    typeof body.extension !== 'number' ||
    !isValidSystem(body.system) ||
    !isValidFabric(body.fabric) ||
    !isValidControl(body.control)
  ) {
    return NextResponse.json({ error: 'Invalid configuration.' }, { status: 400 });
  }
  if (!isValidDimensions(body.width, body.extension)) {
    return NextResponse.json(
      { error: 'Width must exceed extension by at least 0.5 m.' },
      { status: 400 },
    );
  }

  const pricing = await getPricing();
  const totalPrice = calculatePrice(
    {
      width: body.width,
      extension: body.extension,
      system: body.system,
      fabric: body.fabric,
      control: body.control,
    },
    pricing,
  );

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Order endpoint not configured (missing GOOGLE_SHEETS_WEBHOOK_URL).' },
      { status: 500 },
    );
  }

  const sheetData = {
    timestamp: new Date().toISOString(),
    name,
    phone,
    system: body.system === 'turkey' ? 'Turkey' : 'Germany',
    fabric: body.fabric === 'acrylic' ? 'Acrylic' : 'Polyester',
    control: body.control === 'motorized' ? 'Motorized' : 'Manual',
    width: body.width,
    extension: body.extension,
    totalPrice,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetData),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Webhook failed (${response.status}): ${text}`);
    }
    return NextResponse.json({ ok: true, totalPrice });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Order submission failed.' },
      { status: 500 },
    );
  }
}
