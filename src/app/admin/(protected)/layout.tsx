import Link from "next/link";
import { LayoutDashboard, LogOut, Settings, UserCircle2 } from "lucide-react";

import { signOutAction } from "@/app/admin/actions";
import { DemoModeBanner } from "@/components/admin/demo-mode-banner";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { requireAdminSession } from "@/lib/supabase/auth";

const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Profile", href: "/admin/profile" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Skills", href: "/admin/skills" },
  { label: "Experience", href: "/admin/experience" },
  { label: "Education", href: "/admin/education" },
  { label: "Social Links", href: "/admin/social-links" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Media", href: "/admin/media" },
];

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" aria-label="Return to portfolio" className="transition hover:opacity-95">
              <BrandLogo showTagline={false} />
            </Link>
            <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
              {session.mode === "demo" ? "Demo" : "Secure"}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {session.mode === "demo" ? (
                  <Settings className="h-5 w-5" />
                ) : (
                  <UserCircle2 className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{session.userName}</p>
                <p className="text-xs text-muted-foreground">{session.userEmail}</p>
              </div>
            </div>
          </div>

          <nav className="mt-8 flex flex-col gap-2">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Button asChild variant="outline">
              <Link href="/">
                <LayoutDashboard className="mr-2 h-4 w-4" /> View portfolio
              </Link>
            </Button>
            {session.mode === "authenticated" ? (
              <form action={signOutAction}>
                <Button type="submit" variant="ghost" className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </Button>
              </form>
            ) : null}
          </div>
        </aside>
        <div className="space-y-6">
          {session.mode === "demo" ? <DemoModeBanner /> : null}
          {children}
        </div>
      </div>
    </div>
  );
}
