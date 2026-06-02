import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      <p className="section-kicker text-secondary text-xs font-semibold">
        {eyebrow}
      </p>
      <h2 className="text-foreground mt-3 text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      <p className="text-muted-foreground mt-4 text-base leading-7">
        {description}
      </p>
    </div>
  );
}
