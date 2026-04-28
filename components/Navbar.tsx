'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  fabricPage?: boolean;
}

export default function Navbar({ fabricPage = false }: NavbarProps) {
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
        <Link href="/#products">Products</Link>
        <Link href="/#projects">Projects</Link>
        <Link href="/fabrics">Fabrics</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact" className="btn-outline" style={{ marginRight: 0 }}>Get a Quote</Link>
      </div>
    </nav>
  );
}
