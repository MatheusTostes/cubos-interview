import * as React from 'react'

import { cn } from '@/shared/utils/utils'

export const HStack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-row', className)} {...props} />
))
HStack.displayName = 'HStack'
