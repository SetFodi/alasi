import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Preloader from '@/components/Preloader';
import content from '@/lib/site-content';

export const metadata: Metadata = {
  metadataBase: new URL('https://alasi.ge'),
  title: content.seo.homeTitle,
  description: content.seo.homeDescription,
  keywords: content.seo.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: content.seo.homeTitle,
    description: content.seo.homeDescription,
    url: 'https://alasi.ge',
    siteName: 'Alasi',
    locale: 'ka_GE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" async />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18182079511" strategy="afterInteractive" />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18182079511');
          `}
        </Script>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
