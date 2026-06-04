import { cn } from "@/lib/utils";

const navItems = ["Command", "Projects", "LMS", "Launch"];

const metricTiles = [
  { label: "Builds", value: "06" },
  { label: "Flows", value: "14" },
  { label: "Ready", value: "98" },
];

const timeline = [
  { label: "Interface framing", width: "w-3/4", accent: "bg-[#1d75e8]" },
  { label: "Content rebuild", width: "w-1/2", accent: "bg-[#d8a64b]" },
  { label: "Launch polish", width: "w-2/3", accent: "bg-[#7aa7ff]" },
];

export function SystemsWorkbenchVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "workbench-scene relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[1.8rem] border border-white/30 bg-[#dbeaff]/88 p-3 text-[#101f38] shadow-[0_32px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-4",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),transparent_34%,rgba(122,167,255,0.24)_72%,transparent)]" />

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
              Cinematic systems
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

        <div className="mt-5 grid grid-cols-[0.95fr_1.05fr] gap-3">
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
                    Dashboard builder
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
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[1.2rem] border border-white/75 bg-white/72 p-4 shadow-[0_14px_34px_rgba(57,96,142,0.12)]">
                <p className="text-xs font-semibold text-[#617895]">
                  Work time
                </p>
                <div className="mt-3 grid place-items-center">
                  <div className="workbench-ring grid h-20 w-20 place-items-center rounded-full sm:h-24 sm:w-24">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-base font-semibold text-[#101f38] sm:h-16 sm:w-16 sm:text-lg">
                      03:45
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.2rem] border border-white/75 bg-white/72 p-3 shadow-[0_14px_34px_rgba(57,96,142,0.12)] sm:p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-semibold text-[#617895]">
                    Onboarding
                  </p>
                  <p className="text-xl leading-none font-semibold text-[#101f38] sm:text-2xl">
                    42%
                  </p>
                </div>
                <div className="mt-4 flex gap-1.5">
                  <span className="h-8 flex-1 rounded-full bg-[#1976e8] sm:h-9" />
                  <span className="h-8 flex-1 rounded-full bg-[#0d3d74] sm:h-9" />
                  <span className="h-8 w-8 rounded-full bg-[#a9bed5] sm:h-9 sm:w-10" />
                </div>
              </div>
            </div>

            <div className="rounded-[1.25rem] bg-[#0d3d74] p-4 text-white shadow-[0_22px_44px_rgba(13,61,116,0.28)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Scene queue</p>
                <span className="text-2xl font-semibold">3/8</span>
              </div>
              <div className="space-y-2">
                {["Content reset", "Visual pass", "Final review"].map(
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
