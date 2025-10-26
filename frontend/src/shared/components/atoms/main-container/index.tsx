import * as React from 'react'

import { cn } from '@/shared/utils/utils'
import { Footer } from '@/shared/components/molecules/footer'
import { VStack } from '@/shared/components/atoms/vstack'

export const MainContainer = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <VStack className="z-10 mt-20 flex h-full w-full flex-1 overflow-y-auto">
    <main
      ref={ref}
      className={cn('flex w-full flex-1 flex-col', className)}
      {...props}
    />

    <Footer />
  </VStack>
))
MainContainer.displayName = 'MainContainer'
