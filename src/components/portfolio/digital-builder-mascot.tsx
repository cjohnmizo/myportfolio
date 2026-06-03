import { cn } from "@/lib/utils";

export function DigitalBuilderMascot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "soft-3d-scene border-primary/20 relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[2rem] border bg-[radial-gradient(circle_at_50%_16%,rgba(45,212,191,0.22),transparent_34%),linear-gradient(145deg,rgba(13,35,43,0.94),rgba(6,14,19,0.86))] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.34)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="mizo-pattern absolute inset-4 [animation:pattern-drift_18s_linear_infinite] rounded-[1.5rem] opacity-20" />
      <div className="absolute inset-x-8 bottom-7 h-16 rounded-[50%] bg-black/35 blur-2xl" />
      <div className="glow-pulse bg-primary/20 absolute top-8 left-12 h-28 w-28 rounded-full blur-3xl" />
      <div className="glow-pulse bg-secondary/15 absolute right-8 bottom-14 h-32 w-32 rounded-full blur-3xl [animation-delay:900ms]" />

      <div className="card-drift border-primary/20 bg-background/80 absolute top-7 right-6 z-20 w-36 rounded-2xl border p-3 shadow-2xl backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <span className="bg-primary h-2 w-2 rounded-full" />
          <span className="text-primary text-[10px] font-semibold">
            Dashboard
          </span>
        </div>
        <div className="space-y-2">
          <div className="bg-primary/70 h-2 rounded-full" />
          <div className="bg-muted-foreground/35 h-2 w-3/4 rounded-full" />
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div className="bg-primary/15 h-10 rounded-lg" />
            <div className="bg-secondary/20 h-10 rounded-lg" />
            <div className="bg-primary/10 h-10 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="card-drift border-secondary/25 bg-background/80 absolute bottom-12 left-4 z-20 w-32 rounded-[1.4rem] border p-2.5 shadow-2xl backdrop-blur [animation-delay:600ms]">
        <div className="border-primary/20 mx-auto h-28 rounded-[1.1rem] border bg-[linear-gradient(145deg,rgba(45,212,191,0.18),rgba(8,20,26,0.88))] p-2">
          <div className="bg-secondary/70 mb-2 h-2 w-12 rounded-full" />
          <div className="space-y-1.5">
            <div className="bg-background/70 h-5 rounded-lg" />
            <div className="bg-primary/20 h-5 rounded-lg" />
            <div className="bg-background/70 h-5 rounded-lg" />
          </div>
          <div className="bg-primary/60 mt-3 h-2 rounded-full" />
        </div>
      </div>

      <div className="card-drift border-border bg-background/75 absolute top-28 left-5 z-20 w-28 rounded-2xl border p-3 shadow-2xl backdrop-blur [animation-delay:1100ms]">
        <div className="text-secondary mb-2 text-[10px] font-semibold">
          Code
        </div>
        <div className="space-y-1.5">
          <div className="bg-primary/75 h-1.5 rounded-full" />
          <div className="bg-muted-foreground/35 h-1.5 w-5/6 rounded-full" />
          <div className="bg-secondary/65 h-1.5 w-2/3 rounded-full" />
        </div>
      </div>

      <svg
        viewBox="0 0 320 320"
        className="relative z-10 h-full w-full [animation:float-tilt_6s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient
            id="builder-shirt"
            x1="102"
            x2="222"
            y1="126"
            y2="232"
          >
            <stop stopColor="#2dd4bf" stopOpacity="0.95" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="builder-gold" x1="70" x2="248" y1="238" y2="238">
            <stop stopColor="#f5d179" />
            <stop offset="1" stopColor="#d8a64b" />
          </linearGradient>
          <filter
            id="builder-glow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="builder-shadow"
            x="-30%"
            y="-20%"
            width="160%"
            height="150%"
          >
            <feDropShadow
              dx="0"
              dy="14"
              stdDeviation="13"
              floodColor="#000000"
              floodOpacity="0.36"
            />
          </filter>
        </defs>

        <path
          d="M72 254c29-22 50-28 85-19 31 8 55 2 91-19 9 32-15 52-70 58-57 7-93 0-106-20Z"
          fill="#0b1d24"
          stroke="#2dd4bf"
          strokeOpacity="0.24"
          strokeWidth="2"
        />
        <g filter="url(#builder-shadow)">
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
        </g>

        <g filter="url(#builder-glow)">
          <rect
            x="38"
            y="48"
            width="58"
            height="38"
            rx="11"
            fill="#0b1d24"
            stroke="#2dd4bf"
          />
          <path
            d="M54 67h19M78 67h7"
            stroke="#2dd4bf"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <rect
            x="226"
            y="58"
            width="54"
            height="36"
            rx="10"
            fill="#0b1d24"
            stroke="#d8a64b"
          />
          <path
            d="M240 76h15M260 76h5"
            stroke="#d8a64b"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <circle cx="65" cy="126" r="5" fill="#2dd4bf" />
          <circle cx="253" cy="132" r="5" fill="#d8a64b" />
        </g>

        <path
          d="M45 155C78 126 111 134 145 154c39 23 78 28 116-5"
          fill="none"
          stroke="#2dd4bf"
          strokeDasharray="4 10"
          strokeLinecap="round"
          strokeOpacity="0.42"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}
