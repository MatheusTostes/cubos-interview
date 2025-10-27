import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { cn } from '@/shared/utils/utils'
import React from 'react'

export const SinopseCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string
    value: string
  }
>(({ title, value, className, ...props }, ref) => (
  <VStack
    ref={ref}
    className={cn(
      'gap-2 rounded-sm bg-mauve-400/30 p-4 backdrop-blur-sm',
      className
    )}
    {...props}
  >
    <Typography
      variant="h2"
      font="montserrat"
      className="text-md font-bold uppercase text-mauve-1100"
    >
      {title}
    </Typography>
    <Typography variant="p" font="montserrat">
      {value}
    </Typography>
  </VStack>
))
