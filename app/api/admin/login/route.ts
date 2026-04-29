import { NextResponse } from 'next/server';
import { isValidAdminPassword, setAdminSession } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { password?: string } | null;
  if (!body?.password || !isValidAdminPassword(body.password)) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
