"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-racing-red data-[state=checked]:to-racing-dark data-[state=unchecked]:dark:bg-white/10 data-[state=unchecked]:bg-black/10 data-[state=unchecked]:dark:border-white/15 data-[state=unchecked]:border-black/15 focus-visible:border-racing-red/70 focus-visible:ring-racing-red/20 focus-visible:ring-[3px] inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white pointer-events-none block size-5 rounded-full ring-0 transition-transform duration-300 shadow-md data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
