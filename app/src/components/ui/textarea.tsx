import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-white/15 placeholder:text-muted-foreground bg-white/[0.08] backdrop-blur-sm selection:bg-racing-red/30 selection:text-white focus-visible:border-racing-red/70 focus-visible:ring-racing-red/20 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-20 w-full rounded-xl border px-4 py-3 text-sm font-medium shadow-xs transition-all duration-300 outline-none hover:border-white/25 focus-visible:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
