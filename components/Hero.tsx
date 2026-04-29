'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string; alt?: string; 'camera-controls'?: boolean; 'auto-rotate'?: boolean;
        'auto-rotate-delay'?: string; 'rotation-per-second'?: string; 'touch-action'?: string;
        'shadow-intensity'?: string; exposure?: string; 'environment-image'?: string;
        'disable-zoom'?: boolean; 'interaction-prompt'?: string;
      }, HTMLElement>;
    }
  }
}

const FABRICS = [
  { id: 'green',  name: 'Classic Green Stripe', c1: '#2F5D3A', c2: '#F7EFE5', label: 'GS-01' },
  { id: 'sand',   name: 'Sand Beige',            c1: '#C9A97A', c2: '#E8D8BC', label: 'SB-02' },
  { id: 'gray',   name: 'Coastal Gray',          c1: '#7A9AA8', c2: '#D0DFE3', label: 'CG-03' },
  { id: 'forest', name: 'Deep Forest',           c1: '#1A3A28', c2: '#2F5D3A', label: 'DF-04' },
  { id: 'burg',   name: 'CAFÉ Burgundy',         c1: '#4A2724', c2: '#8A4A44', label: 'CB-05' },
  { id: 'navy',   name: 'Atlantic Navy',         c1: '#1E3A5F', c2: '#AEBFC3', label: 'AN-06' },
];

function generateStripeTexture(c1: string, c2: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const numStripes = 8;
  const sw = canvas.width / numStripes;
  for (let i = 0; i < numStripes; i++) {
    ctx.fillStyle = i % 2 === 0 ? c1 : c2;
    ctx.fillRect(i * sw, 0, sw, canvas.height);
  }
  return canvas;
}

async function updateModelTexture(mv: HTMLElement & { createTexture?: (url: string) => Promise<unknown>; model?: { materials: Array<{ name: string; pbrMetallicRoughness?: { baseColorTexture: { setTexture: (t: unknown) => void } } }> } }, c1: string, c2: string) {
  if (!mv?.model || !mv.createTexture) return;
  const canvas = generateStripeTexture(c1, c2);
  const texture = await mv.createTexture(canvas.toDataURL());
  const mat = mv.model.materials.find(m => m.name === 'Canvas') ?? mv.model.materials[0];
  mat?.pbrMetallicRoughness?.baseColorTexture.setTexture(texture);
}

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [label, setLabel] = useState(FABRICS[0].name);
  const [code, setCode] = useState(`Collection ref: ${FABRICS[0].label} · alasi.ge/fabrics`);
  const modelRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroBgRef.current) heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mv = modelRef.current as (HTMLElement & { createTexture?: (url: string) => Promise<unknown>; model?: { materials: Array<{ name: string; pbrMetallicRoughness?: { baseColorTexture: { setTexture: (t: unknown) => void } } }> } }) | null;
    if (!mv) return;
    const onLoad = () => updateModelTexture(mv, FABRICS[0].c1, FABRICS[0].c2);
    mv.addEventListener('load', onLoad);
    return () => mv.removeEventListener('load', onLoad);
  }, []);

  function pickFabric(f: typeof FABRICS[0], idx: number) {
    setActiveIdx(idx);
    setLabel(f.name);
    setCode(`Collection ref: ${f.label} · alasi.ge/fabrics`);
    document.documentElement.style.setProperty('--awning-c1', f.c1);
    document.documentElement.style.setProperty('--awning-c2', f.c2);
    const mv = modelRef.current as (HTMLElement & { createTexture?: (url: string) => Promise<unknown>; model?: { materials: Array<{ name: string; pbrMetallicRoughness?: { baseColorTexture: { setTexture: (t: unknown) => void } } }> } }) | null;
    if (mv) updateModelTexture(mv, f.c1, f.c2);
  }

  return (
    <section id="hero" className="site-hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', transform: 'translateY(0px)' }} ref={heroBgRef} id="hero-bg">
        <img className="hero-bg-img" src="/uploads/The_scene_features_an_awning_w_Nano_Banana_Pro_77361.jpg" alt="" style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,14,13,0.88) 0%, rgba(26,14,13,0.55) 52%, rgba(26,14,13,0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,13,0.6) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(74,39,36,0.15)' }} />
      </div>

      <div className="hero-layout" style={{ flex: 1, position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', padding: '120px 64px 80px', gap: 40 }}>
        <div className="hero-copy" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-sand)', marginBottom: 32, opacity: 0.85 }}>
            ბათუმი &nbsp;·&nbsp; Batumi &nbsp;·&nbsp; Black Sea
          </p>
          <h1 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 'clamp(46px, 4.8vw, var(--tweak-hero-size))', fontWeight: 300, lineHeight: 1.04, color: 'var(--c-cream)', marginBottom: 28, letterSpacing: '0' }}>
            Shade Made<br />for the<br />
            <em style={{ fontStyle: 'italic', color: 'var(--c-sand)' }}>Georgian Sun</em>
          </h1>
          <p style={{ fontSize: 14, color: 'var(--c-light-sand)', maxWidth: 520, marginBottom: 44, fontWeight: 300, lineHeight: 1.72, opacity: 0.88 }}>
            Premium retractable awnings for balconies, CAFÉS, terraces, and homes — engineered for Georgia&apos;s climate, crafted for its character.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="#products" style={{ padding: '16px 42px', background: 'var(--tweak-accent)', color: 'var(--c-cream)', textDecoration: 'none', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, borderRadius: 1, transition: 'opacity 0.3s' }}>Explore Products</Link>
            <Link href="#contact" style={{ padding: '16px 42px', border: '1px solid rgba(216,196,168,0.5)', color: 'var(--c-cream)', textDecoration: 'none', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400, borderRadius: 1, transition: 'all 0.3s', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.04)' }}>Request Consultation</Link>
          </div>
        </div>

        <div className="hero-visualizer" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
          <div className="hero-visualizer-card" style={{ background: 'rgba(26,14,13,0.55)', backdropFilter: 'blur(12px)', border: '1px solid rgba(216,196,168,0.12)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(216,196,168,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-sand)', opacity: 0.7 }}>Awning Visualizer</span>
              <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tweak-accent)', fontWeight: 500 }}>{label}</span>
            </div>
            <div style={{ position: 'relative' }}>
              {/* @ts-expect-error model-viewer custom element */}
              <model-viewer
                suppressHydrationWarning
                ref={modelRef}
                id="awning-model"
                src="/awning/source/awning_bracket.glb"
                camera-controls
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second="12deg"
                touch-action="pan-y"
                style={{ padding: '8px 8px 0', aspectRatio: '16/9', width: '100%', height: 'auto' }}
                shadow-intensity="1"
                exposure="1.2"
                environment-image="neutral"
                disable-zoom
              />
              <div style={{ position: 'absolute', bottom: 16, right: 20, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.35, pointerEvents: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-sand)" strokeWidth="1.5"><path d="M5 9l-3 3 3 3M19 9l3 3-3 3M9 5l3-3 3 3M9 19l3 3 3-3"/><circle cx="12" cy="12" r="1"/></svg>
                <span style={{ fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-sand)' }}>3D View</span>
              </div>
            </div>
            <div style={{ padding: '20px 24px 22px', borderTop: '1px solid rgba(216,196,168,0.1)' }}>
              <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-sand)', opacity: 0.55, marginBottom: 14 }}>Select Fabric</p>
              <div id="fabric-chips" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {FABRICS.map((f, idx) => (
                  <button
                    key={f.id}
                    className={`fabric-chip ${activeIdx === idx ? 'active' : ''}`}
                    title={f.name}
                    onClick={() => pickFabric(f, idx)}
                  >
                    <div style={{ flex: 1, background: f.c1 }} />
                    <div style={{ flex: 1, background: f.c2 }} />
                    <div style={{ flex: 1, background: f.c1 }} />
                    <div style={{ flex: 1, background: f.c2 }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
            <span style={{ fontSize: 10, color: 'var(--c-sand)', opacity: 0.45, letterSpacing: '0.1em' }}>{code}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
