import { isAdminSession } from '@/lib/admin-auth';
import { getSiteContentBoth } from '@/lib/content-store';
import { getPricing } from '@/lib/pricing-store';
import AdminEditor from './AdminEditor';
import AdminLogin from './AdminLogin';
import AdminPricing from './AdminPricing';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAdminSession();
  const [{ en, ka }, pricing] = await Promise.all([getSiteContentBoth(), getPricing()]);

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

        {authed ? (
          <div className="admin-stack">
            <AdminPricing initial={pricing} />
            <AdminEditor initialContentEn={en} initialContentKa={ka} />
          </div>
        ) : (
          <AdminLogin />
        )}
      </section>
    </main>
  );
}
