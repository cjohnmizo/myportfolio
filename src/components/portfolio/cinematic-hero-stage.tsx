"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function CinematicHeroStage({
  avatarUrl,
  fullName,
}: {
  avatarUrl: string;
  fullName: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setIsReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  function resetStage() {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    stage.style.setProperty("--stage-tilt-x", "0deg");
    stage.style.setProperty("--stage-tilt-y", "0deg");
    stage.style.setProperty("--stage-shift-x", "0px");
    stage.style.setProperty("--stage-shift-y", "0px");
  }

  function moveStage(event: React.PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;

    if (!stage || isReducedMotion || event.pointerType !== "mouse") {
      return;
    }

    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    stage.style.setProperty("--stage-tilt-x", `${(-y * 7).toFixed(2)}deg`);
    stage.style.setProperty("--stage-tilt-y", `${(x * 9).toFixed(2)}deg`);
    stage.style.setProperty("--stage-shift-x", `${(x * 18).toFixed(2)}px`);
    stage.style.setProperty("--stage-shift-y", `${(y * 14).toFixed(2)}px`);
  }

  return (
    <div
      ref={stageRef}
      className="cinematic-stage"
      onPointerMove={moveStage}
      onPointerLeave={resetStage}
    >
      <div className="cinematic-stage-glow" aria-hidden="true" />
      <div className="cinematic-orbit cinematic-orbit-one" aria-hidden="true" />
      <div className="cinematic-orbit cinematic-orbit-two" aria-hidden="true" />
      <div className="cinematic-grid-plane" aria-hidden="true" />

      <div className="cinematic-stage-inner">
        <div className="cinematic-panel cinematic-code-panel" aria-hidden="true">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)]" />
          </div>
          <div className="space-y-2 font-mono text-[11px] leading-none text-white/72">
            <p>
              <span className="text-primary">system</span>.build()
            </p>
            <p>
              <span className="text-secondary">lms</span>.launch()
            </p>
            <p>
              <span className="text-[var(--accent-gold)]">mobile</span>.ship()
            </p>
          </div>
        </div>

        <div className="cinematic-panel cinematic-dashboard-panel" aria-hidden="true">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-secondary uppercase">
              Admin view
            </span>
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div className="mt-4 grid grid-cols-4 items-end gap-2">
            <span className="h-8 rounded-full bg-primary/70" />
            <span className="h-12 rounded-full bg-secondary/70" />
            <span className="h-7 rounded-full bg-primary/45" />
            <span className="h-14 rounded-full bg-[var(--accent-gold)]/70" />
          </div>
        </div>

        <div className="cinematic-panel cinematic-lms-panel" aria-hidden="true">
          <p className="text-[10px] font-semibold text-secondary uppercase">
            LMS lane
          </p>
          <div className="mt-3 space-y-2">
            <span className="block h-2 rounded-full bg-primary/80" />
            <span className="block h-2 w-3/4 rounded-full bg-secondary/65" />
            <span className="block h-2 w-1/2 rounded-full bg-white/18" />
          </div>
        </div>

        <div className="cinematic-phone-panel" aria-hidden="true">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-white/28" />
          <div className="mt-4 space-y-2">
            <span className="block h-8 rounded-xl bg-primary/25" />
            <span className="block h-14 rounded-xl bg-secondary/18" />
            <span className="block h-3 rounded-full bg-primary/70" />
          </div>
        </div>

        <div className="cinematic-portrait-card">
          <div className="cinematic-portrait-frame">
            <Image
              src={avatarUrl}
              alt={fullName}
              fill
              priority
              className="object-cover object-[50%_34%]"
              sizes="(max-width: 768px) 82vw, 390px"
            />
            <div className="cinematic-scanline" aria-hidden="true" />
          </div>
        </div>

        <div className="cinematic-core" aria-hidden="true">
          <div className="cinematic-core-face cinematic-core-front" />
          <div className="cinematic-core-face cinematic-core-back" />
          <div className="cinematic-core-face cinematic-core-right" />
          <div className="cinematic-core-face cinematic-core-left" />
          <div className="cinematic-core-face cinematic-core-top" />
          <div className="cinematic-core-face cinematic-core-bottom" />
        </div>
      </div>
    </div>
  );
}
