import Image from "next/image";

import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "border-border flex h-11 w-11 shrink-0 items-center justify-center rounded-md border bg-white p-1",
        className,
      )}
    >
      <Image
        src="/brand/cjohnmizo-logo.png"
        alt=""
        width={1563}
        height={1563}
        className="h-full w-full object-contain"
        sizes="44px"
        priority
      />
    </span>
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
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <BrandMark />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-foreground truncate text-sm font-semibold sm:text-base">
          C. John Remthang
        </span>
        {showTagline ? (
          <span className="text-muted-foreground truncate text-xs">
            cjohnmizo.in
          </span>
        ) : null}
      </span>
    </span>
  );
}
