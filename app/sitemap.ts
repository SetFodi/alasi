import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { getServicePath, serviceHub, servicePages } from '@/lib/service-pages';

const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/fabrics', priority: 0.8 },
  { path: '/tech', priority: 0.8 },
  { path: serviceHub.path, priority: 0.82 },
  ...servicePages.map(page => ({ path: getServicePath(page.slug), priority: 0.76 })),
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
