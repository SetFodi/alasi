'use client';

import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { GOOGLE_ADS_ID } from '@/lib/seo';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

type LeadType = 'email' | 'phone' | 'telegram' | 'whatsapp';

interface LeadLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  leadType: LeadType;
}

function trackLeadClick(leadType: LeadType) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'generate_lead', {
    method: leadType,
  });

  window.gtag('event', 'contact_click', {
    contact_method: leadType,
  });

  if (GOOGLE_ADS_CONVERSION_LABEL) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
    });
  }
}

export default function LeadLink({ children, leadType, onClick, ...props }: LeadLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackLeadClick(leadType);
    onClick?.(event);
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
