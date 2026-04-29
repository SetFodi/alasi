'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import defaultContent, { type SiteContent } from '@/lib/site-content';

interface NavbarProps {
  fabricPage?: boolean;
  content?: SiteContent;
}

export default function Navbar({ fabricPage = false, content = defaultContent }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClass = `navbar${fabricPage ? ' fabric-navbar scrolled' : scrolled ? ' scrolled' : ''}`;

  return (
    <nav className={navClass} id="main-nav">
      <Link href="/#hero" className="brand-link" aria-label="Alasi home">
        <Image className="brand-logo" src="/uploads/alasi-logo-transparent.png" alt="Alasi" width={120} height={34} style={{ width: 'auto', height: 34 }} />
      </Link>
      <div className="nav-links">
        <Link href="/#products">{content.nav.products}</Link>
        <Link href="/#projects">{content.nav.projects}</Link>
        <Link href="/fabrics">{content.nav.fabrics}</Link>
        <Link href="/#about">{content.nav.about}</Link>
        <Link href="/#contact" className="btn-outline" style={{ marginRight: 0 }}>{content.nav.quote}</Link>
      </div>
    </nav>
  );
}
