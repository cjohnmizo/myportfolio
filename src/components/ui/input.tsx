import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:bg-muted flex h-12 w-full rounded-xl border px-4 py-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
