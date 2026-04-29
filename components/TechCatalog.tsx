'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import defaultContent, { type SiteContent } from '@/lib/site-content';

interface TechItem {
  name: string;
  code: string;
  group: GroupId;
  finish: string;
  src: string;
  texture: string;
}

interface TechModel {
  id: ModelId;
  label: string;
  src: string;
  thumb: string;
  thumbOn: string;
}

type GroupId = 'technical-pvc' | 'blackout' | 'screen' | 'soltis';
type ModelId = 'clima-rain' | 'nexus-cable' | 'sc-curve';

type MV = HTMLElement & {
  createTexture?: (url: string) => Promise<unknown>;
  model?: { materials: Array<{ name: string; pbrMetallicRoughness?: { baseColorTexture: { setTexture: (t: unknown) => void } } }> };
};

const GROUPS: { id: GroupId; label: string; description: string }[] = [
  { id: 'technical-pvc', label: 'Technical PVC', description: 'High-cleanability coated PVC for exposed systems.' },
  { id: 'blackout', label: 'Blackout', description: 'Dense fabrics for privacy and stronger solar control.' },
  { id: 'screen', label: 'Screen', description: 'Open-weave technical mesh for filtered light and airflow.' },
  { id: 'soltis', label: 'Soltis', description: 'Architectural Serge Ferrari textiles for refined outdoor shading.' },
];

const FINISH_LABELS: Record<string, string> = {
  'lacquered-1-face': 'Lacquered 1 face',
  'lacquered-on-2-faces': 'Lacquered 2 faces',
  'screen-in': 'Screen In',
  'screen-out': 'Screen Out',
  'soltis-96': 'Soltis 96',
  'soltis-w96': 'Soltis W96',
};

const DEFAULT_FINISH: Record<GroupId, string> = {
  'technical-pvc': 'lacquered-1-face',
  blackout: 'lacquered-on-2-faces',
  screen: 'screen-in',
  soltis: 'soltis-96',
};

async function applyTexture(mv: MV | null, item: TechItem) {
  if (!mv?.model || !mv.createTexture) return;
  const texture = await mv.createTexture(item.texture);
  const material =
    mv.model.materials.find(m => m.name.toLowerCase() === 'fabric') ??
    mv.model.materials.find(m => m.name.toLowerCase().includes('tela')) ??
    mv.model.materials[mv.model.materials.length - 1];
  material?.pbrMetallicRoughness?.baseColorTexture.setTexture(texture);
}

export default function TechCatalog({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.tech.catalog;
  const [textures, setTextures] = useState<TechItem[]>([]);
  const [models, setModels] = useState<TechModel[]>([]);
  const [group, setGroup] = useState<GroupId>('technical-pvc');
  const [finish, setFinish] = useState(DEFAULT_FINISH['technical-pvc']);
  const [selected, setSelected] = useState<TechItem | null>(null);
  const [activeModel, setActiveModel] = useState<ModelId>('nexus-cable');
  const [techOpen, setTechOpen] = useState(false);
  const modelRef = useRef<MV>(null);

  useEffect(() => {
    Promise.all([
      fetch('/uploads/copentek/tech/tech-textures.json').then(r => r.json()),
      fetch('/uploads/copentek/tech/tech-models.json').then(r => r.json()),
    ]).then(([textureData, modelData]: [TechItem[], TechModel[]]) => {
      setTextures(textureData);
      setModels(modelData);
      const first = textureData.find(item => item.group === 'technical-pvc' && item.finish === DEFAULT_FINISH['technical-pvc']) ?? textureData[0];
      setSelected(first);
    });
  }, []);

  const finishes = useMemo(() => {
    return Array.from(new Set(textures.filter(item => item.group === group).map(item => item.finish)));
  }, [textures, group]);

  const visible = useMemo(() => {
    return textures.filter(item => item.group === group && item.finish === finish);
  }, [textures, group, finish]);

  const displaySelected = visible.find(item => item.code === selected?.code) ?? visible[0] ?? selected;
  const currentModel = models.find(model => model.id === activeModel) ?? models[0];
  const currentGroup = GROUPS.find(item => item.id === group)!;

  useEffect(() => {
    if (displaySelected) applyTexture(modelRef.current, displaySelected);
  }, [displaySelected, activeModel]);

  useEffect(() => {
    const mv = modelRef.current;
    if (!mv) return;
    const onLoad = () => { if (displaySelected) applyTexture(mv, displaySelected); };
    mv.addEventListener('load', onLoad);
    return () => mv.removeEventListener('load', onLoad);
  }, [displaySelected, activeModel]);

  function chooseGroup(nextGroup: GroupId) {
    const nextFinish = DEFAULT_FINISH[nextGroup];
    const nextSelection = textures.find(item => item.group === nextGroup && item.finish === nextFinish);
    setGroup(nextGroup);
    setFinish(nextFinish);
    if (nextSelection) setSelected(nextSelection);
  }

  function chooseFinish(nextFinish: string) {
    const nextSelection = textures.find(item => item.group === group && item.finish === nextFinish);
    setFinish(nextFinish);
    if (nextSelection) setSelected(nextSelection);
  }

  return (
    <section className="advance-catalog tech-catalog" id="tech-collection">
      <div className="advance-shell">
        <div className="advance-layout tech-layout">
          <aside className="advance-preview tech-preview">
            <div className="advance-preview-top">
              <div className="advance-preview-title">
                <span>{copy.livePreview}</span>
              </div>
              <div className="advance-model-switcher" aria-label="Technical system">
                {models.map(model => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setActiveModel(model.id)}
                    className={`advance-model-option ${activeModel === model.id ? 'active' : ''}`}
                    aria-pressed={activeModel === model.id}
                    title={model.label}
                  >
                    <img src={activeModel === model.id ? model.thumbOn : model.thumb} alt="" />
                    <span>{model.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {currentModel && (
              // @ts-expect-error model-viewer custom element
              <model-viewer
                suppressHydrationWarning
                ref={modelRef}
                id="tech-model"
                src={currentModel.src}
                camera-controls
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second="7deg"
                interaction-prompt="none"
                touch-action="pan-y"
                exposure="1.05"
                shadow-intensity="0.88"
                environment-image="neutral"
                disable-zoom
              />
            )}

            <div className="advance-model-caption">
              <span>{displaySelected && currentModel ? `${displaySelected.name} · ${currentModel.label}` : currentModel?.label}</span>
              <span>{copy.rotateHint}</span>
            </div>
          </aside>

          <div className="advance-panel">
            <div className="advance-heading">
              <div>
                <p className="advance-kicker">{copy.kicker}</p>
                <h2>{copy.title}</h2>
              </div>
              <Link className="advance-back" href="/fabrics">{copy.backFabrics}</Link>
            </div>

            <div className="advance-tabs" aria-label="Technical fabric category">
              {GROUPS.map(item => (
                <button key={item.id} className={`advance-tab ${group === item.id ? 'active' : ''}`} type="button" onClick={() => chooseGroup(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="advance-finish" aria-label="Technical fabric finish">
              {finishes.map(item => (
                <button key={item} className={`advance-finish-btn ${finish === item ? 'active' : ''}`} type="button" onClick={() => chooseFinish(item)}>
                  {FINISH_LABELS[item] ?? item}
                </button>
              ))}
            </div>

            <div className="advance-copy">
              <p><strong>{currentGroup.label}.</strong> {currentGroup.description} {copy.description}</p>
              <button className="advance-tech" type="button" onClick={() => setTechOpen(o => !o)}>{copy.technicalButton}</button>
            </div>

            <div className="advance-tech-panel" hidden={!techOpen}>
              <div><strong>Application</strong><span>Vertical screens, zip systems, pergolas, and exposed shade products</span></div>
              <div><strong>Performance</strong><span>Solar filtration, privacy control, rain resistance, and dimensional stability</span></div>
              <div><strong>Systems</strong><span>Clima Rain, Nexus Cable, and SC Curve previews</span></div>
              <div><strong>Families</strong><span>Technical PVC, Blackout, Screen, and Soltis</span></div>
              <div><strong>Use case</strong><span>Hospitality terraces, balconies, facades, and commercial outdoor rooms</span></div>
              <div><strong>Preview</strong><span>Apply each texture directly to the selected 3D system</span></div>
            </div>

            <div className="advance-status">
              <span>{visible.length} colours</span>
              <span>{displaySelected ? displaySelected.name : copy.selectFallback}</span>
            </div>

            <div className="advance-grid tech-grid" aria-live="polite">
              {visible.map(item => (
                <button key={`${item.finish}-${item.code}`} type="button" className={`advance-swatch ${item.code === displaySelected?.code ? 'active' : ''}`} onClick={() => setSelected(item)}>
                  <span className="advance-swatch-image"><img src={item.src} alt={`${item.name} technical fabric`} /></span>
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
