import { MetadataRoute } from 'next';
import { api } from '@/lib/http';

export const revalidate = 3600; // revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dpboss.monster';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/matka-free-open',
    '/khatris-favourite-panna-chart',
    '/matka-final-number-chart',
    '/all-22-card-panna-panel-patti-chart',
    '/matka-jodi-count-chart',
    '/panel-count-chart',
    '/panel-total-chart',
    '/jodi-chart-family-matka',
    '/fix-open-to-close-by-date',
    '/main-star-line-panel-chart',
    '/main-star-line-upload-public-link',
    '/kalyan-36-bazar-panel-chart',
    '/kalyan-36-bazar-upload-public-link'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const { data } = await api.get('/website/live-results');
    const allMarkets = data?.all_markets || [];

    const dynamicRoutes = allMarkets.flatMap((market: any) => {
      const encodedName = encodeURIComponent(market.market_name);
      return [
        {
          url: `${baseUrl}/jodi-records-chart/${encodedName}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.7,
        },
        {
          url: `${baseUrl}/panel-records-chart/${encodedName}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.7,
        },
        {
          url: `${baseUrl}/jodi-page/${encodedName}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.6,
        },
        {
          url: `${baseUrl}/panel-page/${encodedName}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.6,
        }
      ];
    });

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
    return staticRoutes;
  }
}
