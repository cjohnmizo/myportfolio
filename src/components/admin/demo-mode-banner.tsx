import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function DemoModeBanner() {
  return (
    <Card className="border-amber-500/20 bg-amber-500/10">
      <CardContent className="flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Badge variant="muted">Demo mode</Badge>
            <p className="font-medium text-foreground">
              Supabase is not configured, so the CMS is running as a UI preview.
            </p>
          </div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Connect the environment variables from `.env.example` to enable authentication,
            persistence, and protected write actions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
