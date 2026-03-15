import { Card, CardContent } from "@/components/ui/card";

export function AdminStatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold text-foreground">{value}</p>
        <p className="text-sm text-slate-300/75">{helper}</p>
      </CardContent>
    </Card>
  );
}
