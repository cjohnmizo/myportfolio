import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminProjectsPage() {
  return (
    <Card>
      <CardContent className="space-y-5 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-kicker text-xs text-primary">Projects</p>
            <h1 className="mt-3 text-3xl font-semibold text-foreground">
              Project manager scaffold
            </h1>
          </div>
          <Button asChild>
            <Link href="/admin/projects/new">New project</Link>
          </Button>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          The collection route is ready. CRUD tables, publish controls, featured toggles, and
          ordering tools will be added in the next stage.
        </p>
      </CardContent>
    </Card>
  );
}
