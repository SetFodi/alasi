'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteContent } from '@/lib/site-content';

type Lang = 'en' | 'ka';
type EditableValue = any;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function setValueAtPath(source: SiteContent, path: string[], value: string) {
  const next = clone(source) as Record<string, any>;
  let target: Record<string, any> = next;

  for (const key of path.slice(0, -1)) {
    target = target[key] as Record<string, any>;
  }

  target[path[path.length - 1]] = value;
  return next as SiteContent;
}

function labelFromKey(key: string) {
  const n = Number(key);
  if (!Number.isNaN(n)) return `Item ${n + 1}`;
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}

function FieldTree({
  value,
  path,
  onChange,
}: {
  value: EditableValue;
  path: string[];
  onChange: (path: string[], value: string) => void;
}) {
  if (typeof value === 'string') {
    const id = path.join('.');
    const long = value.length > 70 || value.includes('\n');

    return (
      <label className="admin-field" htmlFor={id}>
        <span>{labelFromKey(path[path.length - 1])}</span>
        {long ? (
          <textarea id={id} value={value} rows={4} onChange={(e) => onChange(path, e.target.value)} />
        ) : (
          <input id={id} value={value} onChange={(e) => onChange(path, e.target.value)} />
        )}
      </label>
    );
  }

  if (typeof value === 'boolean' || typeof value === 'number') return null;

  return (
    <div className="admin-group">
      {path.length ? <h2>{path.map(labelFromKey).join(' › ')}</h2> : null}
      <div className="admin-fields">
        {Object.entries(value as object).map(([key, child]) => (
          <FieldTree
            key={[...path, key].join('.')}
            value={child}
            path={[...path, key]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default function AdminEditor({
  initialContentEn,
  initialContentKa,
}: {
  initialContentEn: SiteContent;
  initialContentKa: SiteContent;
}) {
  const router = useRouter();
  const [activeLang, setActiveLang] = useState<Lang>('en');
  const [draftEn, setDraftEn] = useState<SiteContent>(initialContentEn);
  const [draftKa, setDraftKa] = useState<SiteContent>(initialContentKa);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const changedEn = useMemo(() => JSON.stringify(draftEn) !== JSON.stringify(initialContentEn), [draftEn, initialContentEn]);
  const changedKa = useMemo(() => JSON.stringify(draftKa) !== JSON.stringify(initialContentKa), [draftKa, initialContentKa]);
  const changed = changedEn || changedKa;

  const draft = activeLang === 'en' ? draftEn : draftKa;

  function update(path: string[], value: string) {
    if (activeLang === 'en') {
      setDraftEn((cur) => setValueAtPath(cur, path, value));
    } else {
      setDraftKa((cur) => setValueAtPath(cur, path, value));
    }
  }

  async function publish() {
    setSaving(true);
    setMessage('');

    const response = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ en: draftEn, ka: draftKa }),
    });
    const data = await response.json().catch(() => ({}));
    setSaving(false);

    if (!response.ok) {
      setMessage(data.error || 'Publish failed.');
      return;
    }

    setMessage('Published. Both EN and KA content are now live.');
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <div className="admin-card admin-editor">
      <div className="admin-toolbar">
        <p>Edit English and Georgian text, then publish — both languages update at once.</p>
        <div>
          <button type="button" className="admin-secondary" onClick={logout}>Logout</button>
          <button type="button" onClick={publish} disabled={saving || !changed}>
            {saving ? 'Publishing...' : 'Publish both languages'}
          </button>
        </div>
      </div>

      {message ? <p className={message.startsWith('Published') ? 'admin-success' : 'admin-error'}>{message}</p> : null}

      <div className="admin-lang-tabs">
        <button
          type="button"
          className={`admin-lang-tab${activeLang === 'en' ? ' active' : ''}${changedEn ? ' dirty' : ''}`}
          onClick={() => setActiveLang('en')}
        >
          English{changedEn ? ' *' : ''}
        </button>
        <button
          type="button"
          className={`admin-lang-tab${activeLang === 'ka' ? ' active' : ''}${changedKa ? ' dirty' : ''}`}
          onClick={() => setActiveLang('ka')}
        >
          ქართული{changedKa ? ' *' : ''}
        </button>
      </div>

      <FieldTree value={draft as unknown as EditableValue} path={[]} onChange={update} />
    </div>
  );
}
