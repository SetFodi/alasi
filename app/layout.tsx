import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alasi — Premium Awnings Georgia',
  description: 'Premium retractable awnings for balconies, cafés, terraces, and homes — engineered for Georgia\'s climate.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" async />
      </head>
      <body>{children}</body>
    </html>
  );
}
