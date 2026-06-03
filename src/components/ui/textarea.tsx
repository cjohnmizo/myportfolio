import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:bg-muted flex min-h-32 w-full rounded-xl border px-4 py-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
