import defaultContent, { type SiteContent } from '@/lib/site-content';

const CONTENT_KEY = process.env.CONTENT_KV_KEY || 'alasi:site-content';

function getRedisConfig() {
  return {
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isRecord(base) || !isRecord(override)) return (override ?? base) as T;

  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = (base as Record<string, unknown>)[key];
    merged[key] = isRecord(baseValue) && isRecord(value) ? deepMerge(baseValue, value) : value;
  }

  return merged as T;
}

async function redisCommand<T>(command: unknown[]): Promise<T | null> {
  const config = getRedisConfig();
  if (!config.url || !config.token) return null;

  const response = await fetch(config.url, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Content storage request failed (${response.status}): ${text}`);
  }

  const data = await response.json() as { result?: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result ?? null;
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const stored = await redisCommand<string>(['GET', CONTENT_KEY]);
    if (!stored) return defaultContent;
    return deepMerge(defaultContent, JSON.parse(stored));
  } catch {
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent) {
  const config = getRedisConfig();
  if (!config.url || !config.token) {
    throw new Error('Missing KV_REST_API_URL and KV_REST_API_TOKEN env vars.');
  }

  const result = await redisCommand<string>(['SET', CONTENT_KEY, JSON.stringify(content)]);
  if (result !== 'OK') throw new Error('Content storage did not confirm the save.');
  return true;
}
