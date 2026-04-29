import type { Metadata } from 'next';
import './globals.css';
import Preloader from '@/components/Preloader';

export const metadata: Metadata = {
  title: 'Alasi — Premium Awnings Georgia',
  description: 'Premium retractable awnings for balconies, CAFÉS, terraces, and homes — engineered for Georgia\'s climate.',
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
