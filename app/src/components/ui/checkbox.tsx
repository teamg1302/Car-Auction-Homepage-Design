"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer dark:border-white/15 border-black/15 dark:bg-white/[0.08] bg-black/[0.08] backdrop-blur-sm data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-racing-red data-[state=checked]:to-racing-dark data-[state=checked]:text-white data-[state=checked]:border-racing-red/50 focus-visible:border-racing-red/70 focus-visible:ring-racing-red/20 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-5 shrink-0 rounded-lg border shadow-xs transition-all duration-300 outline-none dark:hover:border-white/25 hover:border-black/25 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
