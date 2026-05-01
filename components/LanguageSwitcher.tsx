'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('ka');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setCurrentLang(document.cookie.includes('NEXT_LOCALE=en') ? 'en' : 'ka');
    }
  }, []);

  function switchLang(lang: string) {
    if (lang === currentLang) return;
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    setCurrentLang(lang);
    router.refresh();
  }

  return (
    <div className="lang-switcher" style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      background: 'rgba(216,196,168,0.06)', 
      border: '1px solid rgba(216,196,168,0.12)',
      borderRadius: 24, 
      padding: 3, 
      flexShrink: 0
    }}>
      <button 
        onClick={() => switchLang('en')}
        style={{ 
          background: currentLang === 'en' ? 'var(--c-sand)' : 'transparent', 
          color: currentLang === 'en' ? 'var(--c-dark-brown)' : 'var(--c-sand)',
          border: 'none', cursor: 'pointer', borderRadius: 20, 
          padding: '6px 12px', fontSize: 10, fontWeight: 600, 
          letterSpacing: '0.12em', transition: 'all 0.3s ease'
        }}
      >
        EN
      </button>
      <button 
        onClick={() => switchLang('ka')}
        style={{ 
          background: currentLang === 'ka' ? 'var(--c-sand)' : 'transparent', 
          color: currentLang === 'ka' ? 'var(--c-dark-brown)' : 'var(--c-sand)',
          border: 'none', cursor: 'pointer', borderRadius: 20, 
          padding: '6px 12px', fontSize: 10, fontWeight: 600, 
          letterSpacing: '0.12em', transition: 'all 0.3s ease'
        }}
      >
        GE
      </button>
    </div>
  );
}
