import { NextResponse } from 'next/server';
import { isAdminSession } from '@/lib/admin-auth';

export const runtime = 'nodejs';

const CONTENT_KEY_EN = process.env.CONTENT_KV_KEY || 'alasi:site-content';
const CONTENT_KEY_KA = process.env.CONTENT_KV_KEY_KA || 'alasi:site-content:ka';

async function redisDel(key: string) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  if (!url || !token) throw new Error('Missing KV env vars.');

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['DEL', key]),
  });
  if (!res.ok) throw new Error(`Redis DEL failed: ${res.status}`);
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({})) as { lang?: 'en' | 'ka' | 'both' };
  const lang = body.lang || 'both';

  try {
    if (lang === 'en' || lang === 'both') await redisDel(CONTENT_KEY_EN);
    if (lang === 'ka' || lang === 'both') await redisDel(CONTENT_KEY_KA);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Reset failed.' },
      { status: 500 },
    );
  }
}
