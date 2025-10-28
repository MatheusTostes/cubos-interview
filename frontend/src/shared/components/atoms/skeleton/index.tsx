import { cn } from '@/shared/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-mauve-700', className)}
      {...props}
    />
  )
}

export { Skeleton }
