"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Code2, Layers3, X } from "lucide-react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "cjohnmizo:splash:v1";

const focusPills = ["Web", "LMS", "Mobile", "Dashboard"];

const buildStats = [
  { label: "Scenes", value: "06" },
  { label: "Systems", value: "05" },
  { label: "Polish", value: "98%" },
];

const taskRows = ["Content reset", "Visual pass", "Launch polish"];

type SplashPhase = "checking" | "visible" | "leaving" | "hidden";

function hasShownSplash() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "shown";
  } catch {
    return false;
  }
}

function rememberSplash() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "shown");
  } catch {
    // The animation can still finish if session storage is unavailable.
  }
}

export function SplashScreen({
  fullName,
  role,
}: {
  fullName: string;
  role: string;
}) {
  const [phase, setPhase] = useState<SplashPhase>("checking");

  const finishSplash = useCallback(() => {
    rememberSplash();
    setPhase("leaving");
    window.setTimeout(() => setPhase("hidden"), 320);
  }, []);

  useEffect(() => {
    if (hasShownSplash()) {
      return;
    }

    const showTimer = window.setTimeout(() => setPhase("visible"), 0);
    const timer = window.setTimeout(finishSplash, 1750);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(timer);
    };
  }, [finishSplash]);

  if (phase === "checking" || phase === "hidden") {
    return null;
  }

  return (
    <div
      className={cn(
        "splash-overlay fixed inset-0 z-[80] grid items-start justify-items-center overflow-x-hidden overflow-y-auto bg-[#dceaff] px-4 py-4 text-[#0d1d36] backdrop-blur-xl transition-opacity duration-300 sm:place-items-center sm:overflow-hidden sm:bg-[#dceaff]/94 sm:py-6",
        phase === "leaving" && "pointer-events-none opacity-0",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.92),transparent_24rem),radial-gradient(circle_at_84%_72%,rgba(122,167,255,0.36),transparent_28rem)]" />
      <div className="splash-shell relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/75 bg-white/88 p-4 shadow-[0_36px_110px_rgba(31,65,118,0.28)] backdrop-blur-2xl sm:bg-white/64 sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),transparent_38%,rgba(122,167,255,0.18))]" />
        <button
          type="button"
          onClick={finishSplash}
          className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/68 text-[#163055] shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d73e8]"
          aria-label="Skip splash screen"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative rounded-[1.55rem] border border-white/70 bg-[#eef6ff]/95 p-4 sm:bg-[#eef6ff]/78 sm:p-5">
          <div className="flex flex-wrap items-center gap-2 pr-12 text-[11px] font-semibold text-[#233b62]">
            <span className="rounded-full border border-white/80 bg-white/74 px-4 py-2 text-sm text-[#0d2343] shadow-sm">
              cjohnmizo
            </span>
            <span className="rounded-full bg-[#0e4f93] px-4 py-2 text-white shadow-[0_10px_24px_rgba(14,79,147,0.22)]">
              Splash
            </span>
            <span className="rounded-full bg-white/58 px-4 py-2">Build</span>
            <span className="rounded-full bg-white/58 px-4 py-2">Design</span>
            <span className="rounded-full bg-white/58 px-4 py-2">Systems</span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#3773bb]">
                  Welcome in
                </p>
                <h2 className="mt-2 text-3xl leading-tight font-semibold text-[#101f38] sm:text-4xl">
                  {fullName}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#526985]">
                  {role} building clean, practical digital systems with a
                  polished sapphire dashboard feel.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {focusPills.map((pill, index) => (
                  <span
                    key={pill}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-semibold shadow-sm",
                      index === 0
                        ? "bg-[#1976e8] text-white"
                        : "bg-white/74 text-[#28486f]",
                    )}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {buildStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.1rem] border border-white/75 bg-white/70 p-3 shadow-[0_16px_36px_rgba(57,96,142,0.12)] sm:p-4"
                  >
                    <p className="text-xs font-semibold text-[#5f7895]">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[#101f38] sm:text-3xl">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1">
              <div className="rounded-[1.3rem] border border-white/75 bg-white/72 p-4 shadow-[0_16px_40px_rgba(47,86,137,0.14)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#5f7895]">
                      Progress
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-[#101f38]">
                      6.1h
                    </p>
                  </div>
                  <div className="splash-ring grid h-20 w-20 place-items-center rounded-full">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-sm font-semibold text-[#0f2b4c]">
                      78%
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-7 items-end gap-2">
                  {[42, 70, 48, 86, 58, 92, 64].map((height, index) => (
                    <span
                      key={height + index}
                      className="rounded-full bg-[#1b75e8]/85"
                      style={{ height }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-[1.3rem] bg-[#0d3d74] p-4 text-white shadow-[0_22px_44px_rgba(13,61,116,0.28)]">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Launch tasks</p>
                  <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
                    3/3
                  </span>
                </div>
                <div className="space-y-3">
                  {taskRows.map((task, index) => (
                    <div
                      key={task}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-3 py-2"
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-medium">
                        {index === 0 ? (
                          <Code2 className="h-4 w-4 text-[#9fc6ff]" />
                        ) : (
                          <Layers3 className="h-4 w-4 text-[#9fc6ff]" />
                        )}
                        {task}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-[#9fc6ff]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
