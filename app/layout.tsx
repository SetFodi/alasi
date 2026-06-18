import type { Metadata } from 'next';
import Script from 'next/script';
import { cookies } from 'next/headers';
import './globals.css';
import Preloader from '@/components/Preloader';
import { getSiteContent } from '@/lib/content-store';
import { createSeoMetadata, getLocalBusinessJsonLd, GOOGLE_ADS_ID } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return createSeoMetadata(content, 'home');
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value === 'en' ? 'en' : 'ka';
  const localBusinessJsonLd = getLocalBusinessJsonLd();
  const localBusinessJson = JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c');

  return (
    <html lang={lang}>
      <head>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" async />
      </head>
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: localBusinessJson }}
        />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
