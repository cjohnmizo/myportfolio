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
        "border-border bg-input text-foreground placeholder:text-muted-foreground flex h-11 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
