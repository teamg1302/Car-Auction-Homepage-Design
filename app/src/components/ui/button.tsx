import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-racing-red to-racing-dark text-white hover:from-racing-dark hover:to-racing-red hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(217,43,43,0.4)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(220,38,38,0.4)]",
        outline:
          "dark:border border-white/15 border-black/15 dark:bg-white/[0.08] bg-black/[0.08] backdrop-blur-sm text-foreground shadow-xs dark:hover:bg-white/[0.12] hover:bg-black/[0.12] dark:hover:border-white/25 hover:border-black/25 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border border-white/10 border-black/10 hover:-translate-y-0.5",
        ghost:
          "dark:hover:bg-white/5 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10",
        link: "text-racing-red underline-offset-4 hover:underline hover:text-racing-dark",
      },
      size: {
        default: "h-10 px-6 py-2.5 has-[>svg]:px-5",
        sm: "h-8 rounded-lg gap-1.5 px-4 text-xs has-[>svg]:px-3",
        lg: "h-12 rounded-xl px-8 text-base has-[>svg]:px-6",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  // Extract icons and text from children to ensure icons are always on the left
  const children = React.Children.toArray(props.children)
  const icons: React.ReactNode[] = []
  const text: React.ReactNode[] = []

  children.forEach((child) => {
    // Check if it's likely an icon component
    // Lucide icons are React components (not strings) and often have className with size classes
    if (React.isValidElement(child)) {
      const childProps = child.props as { className?: string } | null;
      const isIcon = typeof child.type === 'string' 
        ? child.type === 'svg' // Direct SVG element
        : childProps && typeof childProps.className === 'string' && // React component with className
          (childProps.className.includes('w-') || childProps.className.includes('h-') || childProps.className.includes('size-'))
      
      if (isIcon) {
        icons.push(child)
      } else {
        text.push(child)
      }
    } else {
      text.push(child)
    }
  })

  // If we detected icons, reorder them to be on the left
  const orderedChildren = icons.length > 0 ? [...icons, ...text] : children

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {variant === "default" && (
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">{orderedChildren}</span>
    </Comp>
  )
}

export { Button, buttonVariants }
