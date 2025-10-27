import { Typography } from '@/shared/components/atoms/typography'

import { VStack } from '@/shared/components/atoms/vstack'
import { cn } from '@/shared/utils/utils'
import React from 'react'

export const InfoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string
    value: string
  }
>(({ title, className, value, ...props }, ref) => (
  <VStack
    ref={ref}
    className={cn(
      'min-w-[80px] gap-2 truncate rounded-sm bg-mauve-400/30 p-4 backdrop-blur-sm',
      className
    )}
    {...props}
  >
    <Typography
      variant="h3"
      font="montserrat"
      className="truncate text-xs font-bold uppercase text-mauve-1100"
    >
      {title}
    </Typography>
    <Typography variant="p" font="montserrat" className="font-bold">
      {value}
    </Typography>
  </VStack>
))
