import { NextResponse } from 'next/server';
import { isAdminSession } from '@/lib/admin-auth';
import { saveSiteContentForLang } from '@/lib/content-store';
import type { SiteContent } from '@/lib/site-content';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null) as { en?: SiteContent; ka?: SiteContent } | null;
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Missing content.' }, { status: 400 });
  }

  try {
    const saves: Promise<boolean>[] = [];
    if (body.en && typeof body.en === 'object') saves.push(saveSiteContentForLang('en', body.en));
    if (body.ka && typeof body.ka === 'object') saves.push(saveSiteContentForLang('ka', body.ka));
    if (saves.length === 0) return NextResponse.json({ error: 'No content provided.' }, { status: 400 });
    await Promise.all(saves);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Publish failed.' },
      { status: 500 },
    );
  }
}
