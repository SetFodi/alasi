import { isAdminSession } from '@/lib/admin-auth';
import { getSiteContent } from '@/lib/content-store';
import AdminEditor from './AdminEditor';
import AdminLogin from './AdminLogin';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAdminSession();
  const content = await getSiteContent();

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <div className="admin-header">
          <div>
            <p>Alasi Admin</p>
            <h1>Website content</h1>
          </div>
          <a href="/" className="admin-link">View site</a>
        </div>

        {authed ? <AdminEditor initialContent={content} /> : <AdminLogin />}
      </section>
    </main>
  );
}
