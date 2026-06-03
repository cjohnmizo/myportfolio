import { cn } from "@/lib/utils";

export function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("section-reveal", className)}
      style={{ "--reveal-delay": `${delay * 1000}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
