import type { Metadata } from 'next';
import './globals.css';
import Preloader from '@/components/Preloader';
import content from '@/lib/site-content';

export const metadata: Metadata = {
  title: content.seo.homeTitle,
  description: content.seo.homeDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" async />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
