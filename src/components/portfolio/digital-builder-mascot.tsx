import { cn } from "@/lib/utils";

export function DigitalBuilderMascot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[340px] rounded-[2rem] border border-primary/20 bg-[radial-gradient(circle_at_50%_16%,rgba(45,212,191,0.22),transparent_34%),linear-gradient(145deg,rgba(11,29,36,0.95),rgba(6,14,19,0.86))] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.34)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="mizo-pattern absolute inset-4 rounded-[1.5rem] opacity-25 [animation:pattern-drift_18s_linear_infinite]" />
      <svg
        viewBox="0 0 320 320"
        className="relative z-10 h-full w-full [animation:float-soft_6s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id="builder-shirt" x1="102" x2="222" y1="126" y2="232">
            <stop stopColor="#2dd4bf" stopOpacity="0.95" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="builder-gold" x1="70" x2="248" y1="238" y2="238">
            <stop stopColor="#f5d179" />
            <stop offset="1" stopColor="#d8a64b" />
          </linearGradient>
          <filter id="builder-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M72 254c29-22 50-28 85-19 31 8 55 2 91-19 9 32-15 52-70 58-57 7-93 0-106-20Z"
          fill="#0b1d24"
          stroke="#2dd4bf"
          strokeOpacity="0.24"
          strokeWidth="2"
        />
        <circle cx="160" cy="94" r="46" fill="#f5f7f2" />
        <path
          d="M114 93c6-34 28-54 63-49 23 3 40 17 49 40-15-7-30-8-45-3-22 7-43 5-67 12Z"
          fill="#101923"
        />
        <path
          d="M128 98c11 8 24 8 35 0M178 98c10 8 22 8 31 0"
          stroke="#071015"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <path
          d="M143 119c12 9 29 9 42 0"
          stroke="#0f766e"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          d="M108 235c4-55 26-86 62-86 39 0 61 31 65 86H108Z"
          fill="url(#builder-shirt)"
        />
        <path
          d="M124 184h84M118 202h96"
          stroke="#d8a64b"
          strokeDasharray="10 9"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          d="M79 215h162l17 46H63l16-46Z"
          fill="#dbe7e7"
          stroke="#f5f7f2"
          strokeWidth="3"
        />
        <path d="M102 226h116l7 20H96l6-20Z" fill="#071015" />
        <path
          d="M128 237h36M176 237h20"
          stroke="#2dd4bf"
          strokeLinecap="round"
          strokeWidth="4"
          filter="url(#builder-glow)"
        />
        <path
          d="M82 172c-17 8-27 23-30 45M235 170c18 9 30 24 34 47"
          stroke="#f5f7f2"
          strokeLinecap="round"
          strokeWidth="13"
        />
        <path
          d="M53 217c9 4 17 3 25-2M246 216c9 4 17 3 25-2"
          stroke="#d8a64b"
          strokeLinecap="round"
          strokeWidth="7"
        />

        <g filter="url(#builder-glow)">
          <rect x="38" y="48" width="58" height="38" rx="11" fill="#0b1d24" stroke="#2dd4bf" />
          <path d="M54 67h19M78 67h7" stroke="#2dd4bf" strokeLinecap="round" strokeWidth="4" />
          <rect x="226" y="58" width="54" height="36" rx="10" fill="#0b1d24" stroke="#d8a64b" />
          <path d="M240 76h15M260 76h5" stroke="#d8a64b" strokeLinecap="round" strokeWidth="4" />
          <circle cx="65" cy="126" r="5" fill="#2dd4bf" />
          <circle cx="253" cy="132" r="5" fill="#d8a64b" />
        </g>
      </svg>
      <div className="absolute -right-3 top-12 rounded-2xl border border-primary/20 bg-background/80 px-3 py-2 text-xs font-semibold text-primary shadow-xl backdrop-blur">
        UI cards
      </div>
      <div className="absolute -left-2 bottom-16 rounded-2xl border border-secondary/20 bg-background/80 px-3 py-2 text-xs font-semibold text-secondary shadow-xl backdrop-blur">
        LMS + Apps
      </div>
    </div>
  );
}
