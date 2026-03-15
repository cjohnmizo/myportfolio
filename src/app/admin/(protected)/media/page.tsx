import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaAssetManager } from "@/components/admin/media-asset-manager";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminMediaPage() {
  const [snapshot, session] = await Promise.all([
    getAdminSnapshot(),
    getAdminSessionState(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Media"
        title="Manage media asset records"
        description="Track bucket assignments, alt text, and reusable media references. Direct storage upload wiring is the next integration layer."
      />
      <MediaAssetManager assets={snapshot.mediaAssets} demoMode={session?.mode === "demo"} />
    </div>
  );
}
