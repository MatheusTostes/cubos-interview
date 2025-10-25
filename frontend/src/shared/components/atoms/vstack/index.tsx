import * as React from "react"

import { cn } from "@/shared/utils/utils"

export const VStack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col",
      className
    )}
    {...props}
  />
))
VStack.displayName = "VStack"