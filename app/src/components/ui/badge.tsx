import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-300 overflow-hidden backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "border-racing-red/30 bg-gradient-to-r from-racing-red/95 to-racing-dark/95 text-white shadow-lg [a&]:hover:from-racing-red [a&]:hover:to-racing-dark",
        secondary:
          "dark:border-white/20 border-black/20 dark:bg-white/10 bg-black/10 text-foreground [a&]:hover:dark:bg-white/15 [a&]:hover:bg-black/15 [a&]:hover:dark:border-white/30 [a&]:hover:border-black/30",
        destructive:
          "border-destructive/30 bg-destructive/95 text-white shadow-lg [a&]:hover:bg-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "dark:border-white/15 border-black/15 bg-transparent text-foreground [a&]:hover:dark:bg-white/5 [a&]:hover:bg-black/5 [a&]:hover:dark:border-white/25 [a&]:hover:border-black/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
