'use client';

import { useMemo, useState, type FormEvent } from 'react';
import {
  calculatePrice,
  isValidDimensions,
  WIDTH_MIN,
  WIDTH_MAX,
  EXTENSION_MIN,
  EXTENSION_MAX,
  STEP,
  type PricingConfig,
  type SystemType,
  type FabricType,
  type ControlType,
} from '@/lib/pricing';

export interface CalculatorCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  width: string;
  extension: string;
  meters: string;
  system: string;
  systemTurkey: string;
  systemGermany: string;
  fabric: string;
  fabricAcrylic: string;
  fabricPolyester: string;
  control: string;
  controlManual: string;
  controlMotorized: string;
  total: string;
  validation: string;
  name: string;
  phone: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
}

export default function Calculator({
  pricing,
  copy,
  selectedFabric,
  selectedModel,
  compact = false,
}: {
  pricing: PricingConfig;
  copy: CalculatorCopy;
  selectedFabric?: { name: string; code?: string };
  selectedModel?: string;
  compact?: boolean;
}) {
  const [width, setWidth] = useState(3.0);
  const [extension, setExtension] = useState(2.0);
  const [system, setSystem] = useState<SystemType>('turkey');
  const [fabric, setFabric] = useState<FabricType>('acrylic');
  const [control, setControl] = useState<ControlType>('motorized');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  const [statusText, setStatusText] = useState('');

  const valid = isValidDimensions(width, extension);
  const price = useMemo(
    () =>
      calculatePrice(
        { width, extension, system, fabric, control },
        pricing,
      ),
    [width, extension, system, fabric, control, pricing],
  );

  const canSubmit = valid && name.trim().length > 0 && phone.trim().length > 0 && !submitting;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setStatusType('');
    setStatusText('');

    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        width,
        extension,
        system,
        fabric,
        control,
        name: name.trim(),
        phone: phone.trim(),
        selectedFabricName: selectedFabric?.name,
        selectedFabricCode: selectedFabric?.code,
        selectedModel,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setSubmitting(false);

    if (res.ok) {
      setStatusType('success');
      setStatusText(copy.success);
      setName('');
      setPhone('');
    } else {
      setStatusType('error');
      setStatusText(data.error || copy.error);
    }
  }

  return (
    <section className={`calc-section${compact ? ' calc-section-compact' : ''}`}>
      <div className="calc-shell">
        <div className="calc-header">
          <p className="calc-eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p className="calc-sub">{copy.subtitle}</p>
        </div>

        <form className="calc-form" onSubmit={submit}>
          <div className="calc-grid">
            <div className="calc-field">
              <div className="calc-field-head">
                <span>{copy.width}</span>
                <strong>
                  {width.toFixed(1)} {copy.meters}
                </strong>
              </div>
              <input
                type="range"
                min={WIDTH_MIN}
                max={WIDTH_MAX}
                step={STEP}
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                className="calc-range"
              />
              <div className="calc-range-ticks">
                <span>{WIDTH_MIN}</span>
                <span>{WIDTH_MAX}</span>
              </div>
            </div>

            <div className={`calc-field${!valid ? ' calc-field-invalid' : ''}`}>
              <div className="calc-field-head">
                <span>{copy.extension}</span>
                <strong>
                  {extension.toFixed(1)} {copy.meters}
                </strong>
              </div>
              <input
                type="range"
                min={EXTENSION_MIN}
                max={EXTENSION_MAX}
                step={STEP}
                value={extension}
                onChange={(e) => setExtension(parseFloat(e.target.value))}
                className="calc-range"
              />
              <div className="calc-range-ticks">
                <span>{EXTENSION_MIN}</span>
                <span>{EXTENSION_MAX}</span>
              </div>
            </div>

            <div className="calc-field">
              <div className="calc-field-head">
                <span>{copy.system}</span>
              </div>
              <div className="calc-toggle">
                <button
                  type="button"
                  className={system === 'turkey' ? 'active' : ''}
                  onClick={() => setSystem('turkey')}
                >
                  {copy.systemTurkey}
                </button>
                <button
                  type="button"
                  className={system === 'germany' ? 'active' : ''}
                  onClick={() => setSystem('germany')}
                >
                  {copy.systemGermany}
                </button>
              </div>
            </div>

            <div className="calc-field">
              <div className="calc-field-head">
                <span>{copy.fabric}</span>
              </div>
              <div className="calc-toggle">
                <button
                  type="button"
                  className={fabric === 'acrylic' ? 'active' : ''}
                  onClick={() => setFabric('acrylic')}
                >
                  {copy.fabricAcrylic}
                </button>
                <button
                  type="button"
                  className={fabric === 'polyester' ? 'active' : ''}
                  onClick={() => setFabric('polyester')}
                >
                  {copy.fabricPolyester}
                </button>
              </div>
            </div>

            <div className="calc-field calc-field-full">
              <div className="calc-field-head">
                <span>{copy.control}</span>
              </div>
              <div className="calc-toggle">
                <button
                  type="button"
                  className={control === 'manual' ? 'active' : ''}
                  onClick={() => setControl('manual')}
                >
                  {copy.controlManual}
                </button>
                <button
                  type="button"
                  className={control === 'motorized' ? 'active' : ''}
                  onClick={() => setControl('motorized')}
                >
                  {copy.controlMotorized}
                </button>
              </div>
            </div>
          </div>

          {selectedFabric && (
            <div className="calc-selected-fabric">
              <span>Selected Ares colour</span>
              <strong>{selectedFabric.name}</strong>
              {selectedFabric.code && <em>{selectedFabric.code}</em>}
            </div>
          )}

          {!valid && <p className="calc-warning">{copy.validation}</p>}

          <div className="calc-result">
            <span>{copy.total}</span>
            <strong>
              {price.toLocaleString()} <span className="calc-currency">₾</span>
            </strong>
          </div>

          <div className="calc-contact">
            <input
              type="text"
              placeholder={copy.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
            <input
              type="tel"
              placeholder={copy.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </div>

          {statusText && <p className={`calc-status calc-status-${statusType}`}>{statusText}</p>}

          <button type="submit" className="calc-submit" disabled={!canSubmit}>
            {submitting ? copy.submitting : copy.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
