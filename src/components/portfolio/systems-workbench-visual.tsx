import { cn } from "@/lib/utils";

const workItems = ["School site", "LMS", "NGO system", "Mobile app"];

export function SystemsWorkbenchVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "workbench-scene border-primary/20 relative mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl border bg-[linear-gradient(145deg,rgba(11,27,34,0.96),rgba(6,14,19,0.92))] p-4 shadow-[0_32px_84px_rgba(0,0,0,0.34)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="mizo-pattern absolute inset-0 opacity-[0.05]" />
      <div className="bg-primary/12 absolute -top-20 right-8 h-52 w-52 rounded-full blur-3xl" />
      <div className="bg-secondary/10 absolute -bottom-20 left-4 h-56 w-56 rounded-full blur-3xl" />

      <div className="relative space-y-4">
        <div className="border-border bg-background/78 rounded-2xl border p-4 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-secondary text-xs font-semibold">
                cjohnmizo workbench
              </p>
              <p className="text-foreground mt-1 text-sm font-semibold">
                Practical systems in progress
              </p>
            </div>
            <div className="border-primary/20 bg-primary/10 text-primary rounded-full border px-3 py-1 text-[11px] font-semibold">
              Mizoram
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {workItems.map((item, index) => (
              <div
                key={item}
                className="border-border bg-muted/60 rounded-xl border p-3"
                style={{ opacity: 1 - index * 0.07 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-foreground text-xs font-semibold">
                    {item}
                  </span>
                  <span className="bg-primary h-2 w-2 rounded-full" />
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="bg-muted-foreground/35 h-1.5 rounded-full" />
                  <div className="bg-primary/45 h-1.5 w-2/3 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
          <div className="border-border bg-background/72 rounded-2xl border p-4 shadow-xl shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground text-[11px] font-semibold uppercase">
                Admin flow
              </p>
              <div className="flex gap-1.5">
                <span className="bg-secondary h-2 w-2 rounded-full" />
                <span className="bg-primary h-2 w-2 rounded-full" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-[0.5fr_1fr_0.6fr] gap-2">
                <span className="bg-primary/25 h-10 rounded-xl" />
                <span className="bg-muted h-10 rounded-xl" />
                <span className="bg-secondary/20 h-10 rounded-xl" />
              </div>
              <div className="grid grid-cols-[1fr_0.72fr] gap-2">
                <span className="bg-muted h-16 rounded-xl" />
                <span className="border-primary/20 bg-primary/10 rounded-xl border" />
              </div>
              <div className="border-border bg-muted/50 rounded-xl border p-3">
                <div className="bg-primary/60 mb-2 h-1.5 w-20 rounded-full" />
                <div className="bg-muted-foreground/35 h-1.5 w-32 rounded-full" />
              </div>
            </div>
          </div>

          <div className="border-border bg-background/74 rounded-[1.5rem] border p-3 shadow-xl shadow-black/20">
            <div className="border-primary/15 bg-primary/10 h-full rounded-[1.15rem] border p-3">
              <div className="bg-muted-foreground/40 mx-auto mb-3 h-1.5 w-10 rounded-full" />
              <div className="space-y-2">
                <div className="bg-secondary/25 h-9 rounded-xl" />
                <div className="bg-muted h-9 rounded-xl" />
                <div className="bg-primary/20 h-9 rounded-xl" />
                <div className="bg-muted h-9 rounded-xl" />
              </div>
              <div className="bg-primary mt-4 h-2 rounded-full" />
            </div>
          </div>
        </div>

        <div className="border-border bg-background/70 rounded-2xl border p-4 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground text-[11px] font-semibold uppercase">
              Build notes
            </p>
            <p className="text-primary text-[11px] font-semibold">
              usable after launch
            </p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="bg-primary/60 h-1.5 rounded-full" />
            <div className="bg-muted-foreground/35 h-1.5 rounded-full" />
            <div className="bg-secondary/55 h-1.5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
