'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import defaultContent, { type SiteContent } from '@/lib/site-content';
import LanguageSwitcher from './LanguageSwitcher';
import LeadLink from './LeadLink';

interface NavbarProps {
  fabricPage?: boolean;
  content?: SiteContent;
}

const SCROLLED_OFFSET = 80;

export default function Navbar({ fabricPage = false, content = defaultContent }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_OFFSET);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.body.classList.add('nav-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const navClass = [
    'navbar',
    fabricPage ? 'fabric-navbar scrolled' : scrolled ? 'scrolled' : '',
    isMenuOpen ? 'menu-open' : '',
  ].filter(Boolean).join(' ');

  const menuLinks = [
    { href: '/#products', label: content.nav.products },
    { href: '/#projects', label: content.nav.projects },
    { href: '/fabrics', label: content.nav.fabrics },
    { href: '/tech', label: content.nav.tech },
    { href: '/#about', label: content.nav.about },
  ];

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className={navClass} id="main-nav">
      <Link href="/#hero" className="brand-link" aria-label="Alasi home" onClick={closeMenu}>
        <Image className="brand-logo" src="/uploads/alasi-logo-transparent.png" alt="Alasi" width={120} height={34} style={{ width: 'auto', height: 34 }} />
      </Link>
      <div className={`nav-links${isMenuOpen ? ' open' : ''}`} id="nav-links">
        {menuLinks.map(link => (
          <Link key={link.href} href={link.href} onClick={closeMenu}>{link.label}</Link>
        ))}
        <LeadLink leadType="telegram" href="https://t.me/alasi_awning_system" target="_blank" rel="noopener noreferrer" className="btn-outline" onClick={closeMenu} style={{ marginRight: 0, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          {content.nav.quote}
        </LeadLink>
      </div>
      <div className="nav-actions">
        <LanguageSwitcher />
        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          aria-controls="nav-links"
          onClick={() => setIsMenuOpen(open => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </div>
    </nav>
  );
}
