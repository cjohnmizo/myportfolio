import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

export function AdminRoutePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-8">
        <div>
          <p className="section-kicker text-xs text-primary">Admin route scaffold</p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground">{title}</h1>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
        <p className="text-sm text-muted-foreground">
          The route exists and is wired into the new architecture. The next stage will replace
          this placeholder with the full CMS implementation.
        </p>
        <Link href="/" className="text-sm font-semibold text-primary">
          Back to portfolio
        </Link>
      </CardContent>
    </Card>
  );
}
