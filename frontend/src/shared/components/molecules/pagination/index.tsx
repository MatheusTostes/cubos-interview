import * as React from 'react'

import { cn } from '@/shared/utils/utils'
import { Button } from '../../atoms/button'
import { ChevronIcon } from '@/shared/icons/ChevronIcon'
import { Typography } from '../../atoms/typography'

const PaginationRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-4', className)}
    {...props}
  />
))
PaginationRoot.displayName = 'PaginationRoot'

const PreviousButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn('size-10', className)} {...props}>
    <ChevronIcon className="size-4 rotate-90" />
  </Button>
))
PreviousButton.displayName = 'PreviousButton'

const NextButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn('size-10', className)} {...props}>
    <ChevronIcon className="size-4 -rotate-90" />
  </Button>
))
NextButton.displayName = 'NextButton'

const PageButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    pageNumber: number
    isActive?: boolean
  }
>(({ className, pageNumber, isActive = false, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn(
      'size-10',
      isActive ? 'bg-mauve-200/80 text-mauve-1200' : 'bg-purple-600 text-white',
      className
    )}
    disabled={isActive}
    {...props}
  >
    <Typography font="roboto" variant="p">
      {pageNumber}
    </Typography>
  </Button>
))
PageButton.displayName = 'PageButton'

export const Pagination = {
  Root: PaginationRoot,
  PreviousButton: PreviousButton,
  NextButton: NextButton,
  PageButton: PageButton,
}
