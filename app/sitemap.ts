import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/fabrics', priority: 0.8 },
  { path: '/tech', priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'weekly',
    priority,
  }));
}
