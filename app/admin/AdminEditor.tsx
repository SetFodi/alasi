'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteContent } from '@/lib/site-content';

type EditableValue = string | { [key: string]: EditableValue };

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function setValueAtPath(source: SiteContent, path: string[], value: string) {
  const next = clone(source) as Record<string, EditableValue>;
  let target: Record<string, EditableValue> = next;

  for (const key of path.slice(0, -1)) {
    target = target[key] as Record<string, EditableValue>;
  }

  target[path[path.length - 1]] = value;
  return next as SiteContent;
}

function labelFromKey(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());
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
          <textarea id={id} value={value} rows={4} onChange={(event) => onChange(path, event.target.value)} />
        ) : (
          <input id={id} value={value} onChange={(event) => onChange(path, event.target.value)} />
        )}
      </label>
    );
  }

  return (
    <div className="admin-group">
      {path.length ? <h2>{path.map(labelFromKey).join(' / ')}</h2> : null}
      <div className="admin-fields">
        {Object.entries(value).map(([key, child]) => (
          <FieldTree key={[...path, key].join('.')} value={child} path={[...path, key]} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}

export default function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [draft, setDraft] = useState<SiteContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const changed = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initialContent), [draft, initialContent]);

  function update(path: string[], value: string) {
    setDraft((current) => setValueAtPath(current, path, value));
  }

  async function publish() {
    setSaving(true);
    setMessage('');

    const response = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: draft }),
    });
    const data = await response.json().catch(() => ({}));
    setSaving(false);

    if (!response.ok) {
      setMessage(data.error || 'Publish failed.');
      return;
    }

    setMessage('Published. The live site will read the new text on the next page load.');
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <div className="admin-card admin-editor">
      <div className="admin-toolbar">
        <p>Edit text, press publish, and the live site will read the saved content without a redeploy.</p>
        <div>
          <button type="button" className="admin-secondary" onClick={logout}>Logout</button>
          <button type="button" onClick={publish} disabled={saving || !changed}>
            {saving ? 'Publishing...' : 'Publish to master'}
          </button>
        </div>
      </div>

      {message ? <p className={message.startsWith('Published') ? 'admin-success' : 'admin-error'}>{message}</p> : null}

      <FieldTree value={draft as unknown as EditableValue} path={[]} onChange={update} />
    </div>
  );
}
