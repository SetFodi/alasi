import type { Metadata } from 'next';
import type { SiteContent } from './site-content';

export const SITE_URL = 'https://www.alasi.ge';
export const GOOGLE_ADS_ID = 'AW-18182079511';

type SeoPage = 'home' | 'fabrics' | 'tech';

const PAGE_CONFIG: Record<SeoPage, { path: string; title: keyof SiteContent['seo']; description: keyof SiteContent['seo'] }> = {
  home: {
    path: '/',
    title: 'homeTitle',
    description: 'homeDescription',
  },
  fabrics: {
    path: '/fabrics',
    title: 'fabricsTitle',
    description: 'fabricsDescription',
  },
  tech: {
    path: '/tech',
    title: 'techTitle',
    description: 'techDescription',
  },
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function createSeoMetadata(content: SiteContent, page: SeoPage): Metadata {
  const config = PAGE_CONFIG[page];
  const title = content.seo[config.title] as string;
  const description = content.seo[config.description] as string;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: config.path,
    },
    icons: {
      icon: [{ url: '/uploads/alasi.jpg', type: 'image/jpeg', sizes: '1080x1080' }],
      apple: [{ url: '/uploads/alasi.jpg', type: 'image/jpeg', sizes: '1080x1080' }],
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(config.path),
      siteName: 'Alasi',
      locale: 'ka_GE',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Alasi',
    alternateName: 'ალასი',
    url: SITE_URL,
    logo: absoluteUrl('/uploads/alasi-logo-transparent.png'),
    image: [
      absoluteUrl('/uploads/The_scene_features_an_awning_w_Nano_Banana_Pro_77361.jpg'),
      absoluteUrl('/uploads/Capture_an_architectural_shot__Nano_Banana_Pro_18949.jpg'),
    ],
    email: 'alasicorp@gmail.com',
    telephone: ['+995591060426', '+995591449093'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+995591060426',
        contactType: 'sales',
        areaServed: 'GE',
        availableLanguage: ['ka', 'en'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+995591449093',
        contactType: 'customer service',
        areaServed: 'GE',
        availableLanguage: ['ka', 'en'],
      },
    ],
    priceRange: '₾₾',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rustaveli 21',
      addressLocality: 'Batumi',
      addressRegion: 'Adjara',
      postalCode: '6000',
      addressCountry: 'GE',
    },
    areaServed: [
      { '@type': 'City', name: 'Batumi' },
      { '@type': 'AdministrativeArea', name: 'Adjara' },
      { '@type': 'Country', name: 'Georgia' },
    ],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retractable awning installation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pergola shading systems' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Balcony and terrace shading' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Motorized outdoor shading systems' } },
    ],
    knowsAbout: [
      'მარკიზები ბათუმში',
      'პერგოლები ბათუმში',
      'აივნის მარკიზები',
      'კაფეს ტენტები',
      'Retractable awnings',
      'Pergola shading systems',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Alasi shading services',
      itemListElement: [
        { '@type': 'Offer', url: absoluteUrl('/services/markizebi-batumshi'), itemOffered: { '@type': 'Service', name: 'მარკიზები ბათუმში' } },
        { '@type': 'Offer', url: absoluteUrl('/services/pergolebi-batumshi'), itemOffered: { '@type': 'Service', name: 'პერგოლები ბათუმში' } },
        { '@type': 'Offer', url: absoluteUrl('/services/aivnis-markizebi'), itemOffered: { '@type': 'Service', name: 'აივნის მარკიზები' } },
        { '@type': 'Offer', url: absoluteUrl('/services/terasisa-da-kafes-tentebi'), itemOffered: { '@type': 'Service', name: 'ტერასისა და კაფეს ტენტები' } },
      ],
    },
    sameAs: [
      'https://www.instagram.com/alasi_awning/',
      'https://www.facebook.com/61575455356755',
      'https://t.me/alasi_awning_system',
    ],
  };
}
