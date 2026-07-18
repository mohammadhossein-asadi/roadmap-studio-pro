"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
        beginner: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
        intermediate: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        advanced: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
        expert: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
