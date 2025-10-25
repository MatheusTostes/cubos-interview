import * as React from "react"

import { cn } from "@/shared/utils/utils"

export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "container mx-auto px-4 py-4",
      className
    )}
    {...props}
  />
))
Container.displayName = "Container"