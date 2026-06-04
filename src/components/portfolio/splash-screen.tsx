"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "cjohnmizo:splash:v2";

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
  avatarUrl,
}: {
  fullName: string;
  avatarUrl: string;
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
    const timer = window.setTimeout(finishSplash, 2200);

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
        "splash-overlay fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-[#eaf3ff]/96 px-5 text-[#0d1d36] backdrop-blur-xl transition-opacity duration-300",
        phase === "leaving" && "pointer-events-none opacity-0",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="mizo-pattern absolute inset-0 opacity-[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.95),transparent_28rem),linear-gradient(180deg,rgba(220,234,255,0.72),rgba(247,251,255,0.92))]" />

      <div className="splash-shell relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/80 bg-white/74 p-6 text-center shadow-[0_34px_100px_rgba(45,86,136,0.22)] backdrop-blur-2xl sm:p-8">
        <button
          type="button"
          onClick={finishSplash}
          className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#163055] shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d73e8]"
          aria-label="Skip splash screen"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto h-28 w-28 overflow-hidden rounded-[1.6rem] border border-white/90 bg-[#dceaff] p-1 shadow-[0_18px_44px_rgba(45,86,136,0.22)]">
          <div className="relative h-full w-full overflow-hidden rounded-[1.25rem]">
            <Image
              src={avatarUrl}
              alt={fullName}
              fill
              priority
              className="object-cover object-[50%_34%]"
              sizes="112px"
            />
          </div>
        </div>

        <p className="mt-6 text-sm font-semibold text-[#1976e8]">
          cjohnmizo.in
        </p>
        <h2 className="mt-2 text-3xl leading-tight font-semibold text-[#101f38]">
          {fullName}
        </h2>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#526985]">
          Web, LMS, mobile, and interface work.
        </p>

        <div className="mt-7 h-2 overflow-hidden rounded-full bg-[#d8e7f7]">
          <div className="splash-progress h-full rounded-full bg-[#1976e8]" />
        </div>
        <p className="mt-3 text-xs font-semibold text-[#6a7f9a]">
          Preparing portfolio
        </p>
      </div>
    </div>
  );
}
