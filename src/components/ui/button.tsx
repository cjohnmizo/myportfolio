import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary px-5 py-3 text-primary-foreground shadow-[0_14px_34px_rgba(25,118,232,0.24)] hover:-translate-y-0.5 hover:bg-[#0f5fba]",
        outline:
          "border border-border bg-white/70 px-5 py-3 text-foreground shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-primary/50 hover:bg-white",
        ghost:
          "px-4 py-2 text-muted-foreground hover:bg-white/62 hover:text-foreground",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-6 py-3",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
