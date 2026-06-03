import { cn } from "@/lib/utils";

const navItems = ["Dashboard", "Projects", "Apps", "Calendar"];

const metricTiles = [
  { label: "Projects", value: "12" },
  { label: "Systems", value: "05" },
  { label: "Pages", value: "48" },
];

const timeline = [
  { label: "LMS workflow", width: "w-3/4", accent: "bg-[#1d75e8]" },
  { label: "Admin polish", width: "w-1/2", accent: "bg-[#d8a64b]" },
  { label: "Mobile app", width: "w-2/3", accent: "bg-[#7aa7ff]" },
];

export function SystemsWorkbenchVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "workbench-scene relative mx-auto w-full max-w-[500px] overflow-hidden rounded-[1.8rem] border border-white/30 bg-[#dbeaff]/88 p-3 text-[#101f38] shadow-[0_32px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-4",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.9),transparent_18rem),radial-gradient(circle_at_86%_80%,rgba(122,167,255,0.34),transparent_20rem)]" />
      <div className="absolute top-8 left-8 h-24 w-24 rounded-full bg-white/45 blur-2xl" />
      <div className="absolute right-6 bottom-8 h-28 w-28 rounded-full bg-[#d8a64b]/18 blur-2xl" />

      <div className="relative rounded-[1.45rem] border border-white/75 bg-white/58 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] sm:p-4">
        <div className="flex flex-wrap items-center gap-2 pr-1 text-[10px] font-semibold text-[#28486f]">
          <span className="rounded-full border border-white/80 bg-white/80 px-3 py-2 text-xs text-[#11233d] shadow-sm">
            cjohnmizo
          </span>
          {navItems.map((item, index) => (
            <span
              key={item}
              className={cn(
                "rounded-full px-3 py-2",
                index === 0
                  ? "bg-[#0e4f93] text-white shadow-[0_10px_24px_rgba(14,79,147,0.22)]"
                  : "bg-white/52",
              )}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#3773bb]">Welcome in</p>
            <p className="mt-1 text-2xl leading-tight font-semibold text-[#101f38] sm:text-3xl">
              Practical systems
            </p>
          </div>
          <div className="flex gap-3">
            {metricTiles.map((metric) => (
              <div key={metric.label} className="min-w-14 text-center">
                <p className="text-2xl font-semibold text-[#101f38]">
                  {metric.value}
                </p>
                <p className="text-[10px] font-medium text-[#657b96]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            <div className="overflow-hidden rounded-[1.2rem] border border-white/75 bg-[#b9dcf1] shadow-[0_16px_36px_rgba(57,96,142,0.16)]">
              <div className="relative h-36">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,#aee4f0,#f5fbff)]" />
                <div className="absolute right-5 bottom-5 left-5">
                  <div className="h-16 w-16 rounded-2xl border border-white/65 bg-[#101f38] shadow-xl" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    C. John Remthang
                  </p>
                  <p className="text-xs font-medium text-white/78">
                    Portfolio dashboard
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.2rem] border border-white/75 bg-white/70 p-4 shadow-[0_14px_34px_rgba(57,96,142,0.12)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#101f38]">
                  Stack pulse
                </p>
                <span className="rounded-full bg-[#e7f1ff] px-3 py-1 text-[10px] font-semibold text-[#3573bb]">
                  Live
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {timeline.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-medium text-[#617895]">
                      <span>{item.label}</span>
                      <span>Ready</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#d8e7f7]">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          item.accent,
                          item.width,
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] border border-white/75 bg-white/72 p-4 shadow-[0_14px_34px_rgba(57,96,142,0.12)]">
                <p className="text-xs font-semibold text-[#617895]">
                  Work time
                </p>
                <div className="mt-3 grid place-items-center">
                  <div className="workbench-ring grid h-24 w-24 place-items-center rounded-full">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-lg font-semibold text-[#101f38]">
                      03:45
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.2rem] border border-white/75 bg-white/72 p-4 shadow-[0_14px_34px_rgba(57,96,142,0.12)]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#617895]">
                    Onboarding
                  </p>
                  <p className="text-2xl font-semibold text-[#101f38]">42%</p>
                </div>
                <div className="mt-4 flex gap-1.5">
                  <span className="h-9 flex-1 rounded-full bg-[#1976e8]" />
                  <span className="h-9 flex-1 rounded-full bg-[#0d3d74]" />
                  <span className="h-9 w-10 rounded-full bg-[#a9bed5]" />
                </div>
              </div>
            </div>

            <div className="rounded-[1.25rem] bg-[#0d3d74] p-4 text-white shadow-[0_22px_44px_rgba(13,61,116,0.28)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Launch queue</p>
                <span className="text-2xl font-semibold">3/8</span>
              </div>
              <div className="space-y-2">
                {["Client meeting", "Design review", "Project update"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-3 py-2"
                    >
                      <span className="text-xs font-medium">{item}</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#7aa7ff]" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
