import { useId } from "react";

import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const shellId = `${id}-brand-shell`;
  const strokeId = `${id}-brand-stroke`;
  const glowId = `${id}-brand-glow`;

  return (
    <svg
      viewBox="0 0 128 128"
      aria-hidden="true"
      className={cn("h-10 w-10 shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={shellId} x1="18" y1="14" x2="112" y2="116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e1b4b" />
          <stop offset="0.52" stopColor="#0f172a" />
          <stop offset="1" stopColor="#052e16" />
        </linearGradient>
        <linearGradient id={strokeId} x1="20" y1="20" x2="108" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a5b4fc" />
          <stop offset="0.54" stopColor="#818cf8" />
          <stop offset="1" stopColor="#86efac" />
        </linearGradient>
        <filter id={glowId} x="0" y="0" width="128" height="128" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="10" y="10" width="108" height="108" rx="30" fill={`url(#${shellId})`} />
      <rect
        x="12"
        y="12"
        width="104"
        height="104"
        rx="28"
        stroke={`url(#${strokeId})`}
        strokeOpacity="0.9"
        strokeWidth="4"
      />
      <circle cx="34" cy="35" r="6" fill="#818cf8" />
      <path
        d="M50 45L33 64L50 83"
        stroke="#c7d2fe"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
        filter={`url(#${glowId})`}
      />
      <path
        d="M79 44L64 90"
        stroke={`url(#${strokeId})`}
        strokeLinecap="round"
        strokeWidth="8"
        filter={`url(#${glowId})`}
      />
      <path
        d="M74 82H96"
        stroke="#86efac"
        strokeLinecap="round"
        strokeWidth="10"
        filter={`url(#${glowId})`}
      />
    </svg>
  );
}

function BrandWordmark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const wordId = `${id}-brand-word`;
  const accentId = `${id}-brand-accent`;

  return (
    <svg
      viewBox="0 0 426 96"
      aria-label="cjohnmizo"
      role="img"
      className={cn("h-9 w-auto shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={wordId} x1="188" y1="18" x2="342" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c7d2fe" />
          <stop offset="0.52" stopColor="#818cf8" />
          <stop offset="1" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id={accentId} x1="30" y1="74" x2="360" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#312e81" />
          <stop offset="0.45" stopColor="#818cf8" />
          <stop offset="1" stopColor="#86efac" />
        </linearGradient>
      </defs>

      <text
        x="0"
        y="57"
        fill="#818cf8"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="28"
        fontWeight="700"
        letterSpacing="2"
      >
        &lt;
      </text>
      <text
        x="28"
        y="57"
        fill="#E2E8F0"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="38"
        fontWeight="700"
        letterSpacing="3.8"
      >
        cjohn
      </text>
      <text
        x="196"
        y="57"
        fill={`url(#${wordId})`}
        fontFamily="'JetBrains Mono', monospace"
        fontSize="38"
        fontWeight="700"
        letterSpacing="3.8"
      >
        mizo
      </text>
      <text
        x="340"
        y="57"
        fill="#86efac"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="28"
        fontWeight="700"
        letterSpacing="2"
      >
        /&gt;
      </text>
      <path d="M30 72H358" stroke={`url(#${accentId})`} strokeLinecap="round" strokeWidth="3.5" />
      <circle cx="375" cy="25" r="5.5" fill="#818cf8" fillOpacity="0.95" />
    </svg>
  );
}

export function BrandLogo({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <BrandMark className="h-11 w-11" />
      <span className="flex min-w-0 flex-col">
        <BrandWordmark />
        {showTagline ? (
          <span className="hidden text-[0.58rem] uppercase tracking-[0.34em] text-primary/80 sm:block">
            craft. code. calm systems.
          </span>
        ) : null}
      </span>
    </span>
  );
}
