'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PricingConfig } from '@/lib/pricing';

const FIELDS: Array<{ key: keyof PricingConfig; label: string; suffix: string }> = [
  { key: 'usdRate', label: 'USD → GEL rate', suffix: 'GEL per $' },
  { key: 'marginCoefficient', label: 'Margin coefficient', suffix: '×' },
  { key: 'systemTurkey', label: 'Frame — Turkey', suffix: '$ / linear m' },
  { key: 'systemGermany', label: 'Frame — Germany', suffix: '$ / linear m' },
  { key: 'fabricAcrylic', label: 'Fabric — Acrylic (Spain)', suffix: '$ / m²' },
  { key: 'fabricPolyester', label: 'Fabric — Polyester', suffix: '$ / m²' },
  { key: 'motor', label: 'Motor', suffix: '$' },
];

export default function AdminPricing({ initial }: { initial: PricingConfig }) {
  const router = useRouter();
  const [draft, setDraft] = useState<PricingConfig>(initial);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState('');

  const changed = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(initial),
    [draft, initial],
  );

  function update(key: keyof PricingConfig, raw: string) {
    const num = parseFloat(raw);
    setDraft((cur) => ({ ...cur, [key]: Number.isNaN(num) ? 0 : num }));
  }

  async function save() {
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/admin/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pricing: draft }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setMessage(data.error || 'Save failed.');
      return;
    }
    setMessage('Pricing saved. The calculator now uses these values.');
    router.refresh();
  }

  async function reset() {
    if (!confirm('Reset pricing to defaults? Current saved values will be deleted.')) return;
    setResetting(true);
    setMessage('');
    const res = await fetch('/api/admin/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reset: true }),
    });
    const data = await res.json().catch(() => ({}));
    setResetting(false);
    if (!res.ok) {
      setMessage(data.error || 'Reset failed.');
      return;
    }
    router.refresh();
  }

  return (
    <div className="admin-card admin-editor">
      <div className="admin-toolbar">
        <p>Calculator pricing — drives the live quote on /calculator.</p>
        <div>
          <button
            type="button"
            className="admin-secondary admin-danger"
            onClick={reset}
            disabled={resetting}
          >
            {resetting ? 'Resetting...' : 'Reset pricing'}
          </button>
          <button type="button" onClick={save} disabled={saving || !changed}>
            {saving ? 'Saving...' : 'Save pricing'}
          </button>
        </div>
      </div>

      {message ? (
        <p className={message.startsWith('Pricing saved') ? 'admin-success' : 'admin-error'}>
          {message}
        </p>
      ) : null}

      <div className="admin-fields">
        {FIELDS.map(({ key, label, suffix }) => (
          <label key={key} className="admin-field">
            <span>
              {label} <em style={{ opacity: 0.6, fontStyle: 'normal' }}>({suffix})</em>
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={draft[key]}
              onChange={(e) => update(key, e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
