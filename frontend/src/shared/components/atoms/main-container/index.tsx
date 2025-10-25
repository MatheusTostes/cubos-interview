import * as React from 'react'

import { cn } from '@/shared/utils/utils'

export const MainContainer = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      'flex h-full w-full flex-1 items-center justify-center',
      className
    )}
    {...props}
  />
))
MainContainer.displayName = 'MainContainer'
