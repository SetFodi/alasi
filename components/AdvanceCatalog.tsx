'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface FabricItem {
  name: string;
  code: string;
  group: string;
  coating: string;
  src: string;
  texture: string;
}

interface AdvanceState {
  group: string;
  coating: string;
  selected: FabricItem | null;
}

type ModelId = 'desert' | 'ares';

const MODELS: { id: ModelId; label: string; src: string; thumb: string; fabricMaterial: string }[] = [
  { id: 'desert', label: 'Desert',  src: '/uploads/copentek/models/desert-materials.glb', thumb: '/uploads/copentek/thumb-desert.webp', fabricMaterial: 'Fabric' },
  { id: 'ares',   label: 'Ares',    src: '/uploads/copentek/models/ares-materials.glb',   thumb: '/uploads/copentek/thumb-ares.webp',   fabricMaterial: 'Fabric' },
];

type MV = HTMLElement & {
  createTexture?: (url: string) => Promise<unknown>;
  model?: { materials: Array<{ name: string; pbrMetallicRoughness?: { baseColorTexture: { setTexture: (t: unknown) => void } } }> };
};

async function applyTexture(mv: MV | null, item: FabricItem) {
  if (!mv?.model || !mv.createTexture) return;
  const texture = await mv.createTexture(item.texture);
  const mat = mv.model.materials.find(m => m.name === 'Fabric') ?? mv.model.materials[0];
  mat?.pbrMetallicRoughness?.baseColorTexture.setTexture(texture);
}

export default function AdvanceCatalog() {
  const [textures, setTextures] = useState<FabricItem[]>([]);
  const [state, setState] = useState<AdvanceState>({ group: 'plain', coating: 'normal', selected: null });
  const [techOpen, setTechOpen] = useState(false);
  const [activeModel, setActiveModel] = useState<ModelId>('desert');
  const modelRef = useRef<MV>(null);

  useEffect(() => {
    fetch('/uploads/copentek/advance-textures.json')
      .then(r => r.json())
      .then((data: FabricItem[]) => {
        setTextures(data);
        const first = data.find(d => d.group === 'plain' && d.coating === 'normal') ?? data[0];
        setState(s => ({ ...s, selected: first }));
      });
  }, []);

  // Re-apply texture when model finishes loading (after model switch)
  useEffect(() => {
    const mv = modelRef.current;
    if (!mv || !state.selected) return;
    const onLoad = () => { if (state.selected) applyTexture(mv, state.selected); };
    mv.addEventListener('load', onLoad);
    return () => mv.removeEventListener('load', onLoad);
  }, [activeModel, state.selected]);

  function getVisible() {
    return textures.filter(item => {
      if (item.group !== state.group) return false;
      if (item.group !== 'plain') return true;
      return item.coating === state.coating;
    });
  }

  function selectItem(item: FabricItem) {
    setState(s => ({ ...s, selected: item }));
    applyTexture(modelRef.current, item);
  }

  function setGroup(group: string) {
    setState(s => ({ ...s, group, coating: group !== 'plain' ? 'normal' : s.coating }));
  }

  const visible = getVisible();
  const displaySelected = visible.includes(state.selected!) ? state.selected : visible[0] ?? null;
  const currentModel = MODELS.find(m => m.id === activeModel)!;

  return (
    <section className="advance-catalog" id="collection">
      <div className="advance-shell">
        <div className="advance-layout">
          <aside className="advance-preview">
            <div className="advance-preview-top">
              <div className="advance-preview-title">
                <span>Live preview</span>
                <strong>{displaySelected?.code ?? '—'}</strong>
              </div>
              <div className="advance-model-switcher" aria-label="Awning model">
                {MODELS.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveModel(m.id)}
                    className={`advance-model-option ${activeModel === m.id ? 'active' : ''}`}
                    aria-pressed={activeModel === m.id}
                    title={m.label}
                  >
                    <img src={m.thumb} alt="" />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* @ts-expect-error model-viewer custom element */}
            <model-viewer
              suppressHydrationWarning
              ref={modelRef}
              id="advance-model"
              src={currentModel.src}
              camera-controls
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="8deg"
              interaction-prompt="none"
              touch-action="pan-y"
              exposure="1.08"
              shadow-intensity="0.9"
              environment-image="neutral"
              disable-zoom
            />

            <div className="advance-model-caption">
              <span>{displaySelected ? `${displaySelected.name} · ${currentModel.label}` : currentModel.label}</span>
              <span>Drag to rotate</span>
            </div>
          </aside>

          <div className="advance-panel">
            <div className="advance-heading">
              <div>
                <p className="advance-kicker">Technical fabrics for outdoor use</p>
                <h2>Advance Collection</h2>
              </div>
              <Link className="advance-back" href="/">Back home</Link>
            </div>

            <div className="advance-tabs" aria-label="Fabric collection">
              {['plain', 'classics', 'fantasy'].map(g => (
                <button key={g} className={`advance-tab ${state.group === g ? 'active' : ''}`} type="button" onClick={() => setGroup(g)}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>

            <div className="advance-finish" aria-label="Fabric finish">
              <button className={`advance-finish-btn ${state.coating === 'normal' ? 'active' : ''}`} type="button" onClick={() => setState(s => ({ ...s, coating: 'normal' }))}>Normal</button>
              <button className={`advance-finish-btn ${state.coating === 'resined' ? 'active' : ''}`} type="button" disabled={state.group !== 'plain'} onClick={() => setState(s => ({ ...s, coating: 'resined' }))}>Resined</button>
            </div>

            <div className="advance-copy">
              <p>Water-repellent acrylic awning fabrics with colour stability, stain resistance, and a technical finish made for outdoor shade systems.</p>
              <button className="advance-tech" type="button" onClick={() => setTechOpen(o => !o)}>Technical characteristics</button>
            </div>

            <div className="advance-tech-panel" hidden={!techOpen}>
              <div><strong>Composition</strong><span>100% solution-dyed acrylic fabric</span></div>
              <div><strong>Weight</strong><span>295±5% gr/m2</span></div>
              <div><strong>Width</strong><span>120±1% cm</span></div>
              <div><strong>Water penetration</strong><span>&gt; 35 cm/H2O · UNE-EN 20811</span></div>
              <div><strong>UV fastness</strong><span>7-8 Class/8 · EN ISO 105-B02</span></div>
              <div><strong>Spray test</strong><span>5 Class/5 · UNE EN ISO 4920</span></div>
            </div>

            <div className="advance-status">
              <span>{visible.length} colours</span>
              <span>{displaySelected ? `${displaySelected.name} / ${displaySelected.code}` : 'Select a fabric'}</span>
            </div>

            <div className="advance-grid" aria-live="polite">
              {visible.map(item => (
                <button key={item.code} type="button" className={`advance-swatch ${item === displaySelected ? 'active' : ''}`} onClick={() => selectItem(item)}>
                  <span className="advance-swatch-image"><img src={item.src} alt={`${item.name} fabric`} /></span>
                  <span className="advance-swatch-name">{item.name}</span>
                  <span className="advance-swatch-code">{item.code}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
