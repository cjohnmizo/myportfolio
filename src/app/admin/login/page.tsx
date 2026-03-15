import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-16 sm:px-6">
      <Card className="w-full glass-panel">
        <CardContent className="space-y-6 p-8">
          <div>
            <p className="section-kicker text-xs text-primary">Admin access</p>
            <h1 className="mt-3 text-3xl font-semibold text-foreground">
              CMS login route is ready
            </h1>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Authentication wiring lands in the next implementation stage. This route is already
            reserved for Supabase Auth and protected admin access.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/admin/dashboard">Open scaffolded dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Return home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
