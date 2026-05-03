import { DEFAULT_PRICING, type PricingConfig } from './pricing';

const PRICING_KEY = process.env.PRICING_KV_KEY || 'alasi:pricing';

function getRedisConfig() {
  return {
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
  };
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

  if (!response.ok) return null;
  const data = (await response.json()) as { result?: T };
  return data.result ?? null;
}

export async function getPricing(): Promise<PricingConfig> {
  try {
    const stored = await redisCommand<string>(['GET', PRICING_KEY]);
    if (!stored) return DEFAULT_PRICING;
    const parsed = JSON.parse(stored) as Partial<PricingConfig>;
    return { ...DEFAULT_PRICING, ...parsed };
  } catch {
    return DEFAULT_PRICING;
  }
}

export async function savePricing(pricing: PricingConfig): Promise<boolean> {
  const config = getRedisConfig();
  if (!config.url || !config.token) {
    throw new Error('Missing KV_REST_API_URL and KV_REST_API_TOKEN env vars.');
  }
  const result = await redisCommand<string>(['SET', PRICING_KEY, JSON.stringify(pricing)]);
  if (result !== 'OK') throw new Error('Pricing storage did not confirm the save.');
  return true;
}

export async function resetPricing(): Promise<void> {
  const config = getRedisConfig();
  if (!config.url || !config.token) {
    throw new Error('Missing KV_REST_API_URL and KV_REST_API_TOKEN env vars.');
  }
  await redisCommand<number>(['DEL', PRICING_KEY]);
}
