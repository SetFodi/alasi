import { NextResponse } from 'next/server';
import { isAdminSession } from '@/lib/admin-auth';
import { saveSiteContent } from '@/lib/content-store';
import type { SiteContent } from '@/lib/site-content';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body = await request.json().catch(() => null) as { content?: SiteContent } | null;
  if (!body?.content || typeof body.content !== 'object') {
    return NextResponse.json({ error: 'Missing content.' }, { status: 400 });
  }

  try {
    await saveSiteContent(body.content);
    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Publish failed.' },
      { status: 500 },
    );
  }
}
