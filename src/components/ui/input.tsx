import * as React from "react"

import { cn } from "@/lib/utils"
import { usePopoverZoom } from "@/contexts/popoverZoom"

function Input({ className, type, style, ...props }: React.ComponentProps<"input">) {
  const zoom = usePopoverZoom();
  // Counteract parent CSS zoom (same pattern as Select trigger) so the input
  // renders at a consistent size on all platforms including iOS Safari,
  // where CSS zoom does not reliably cascade to native <input> elements.
  const zoomStyle: React.CSSProperties = zoom
    ? { fontSize: `${1 / zoom}em`, height: `${1 / zoom}em` }
    : {};

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      style={{ ...zoomStyle, ...style }}
      {...props}
    />
  )
}

export { Input }
