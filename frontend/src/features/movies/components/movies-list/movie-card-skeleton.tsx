import { Card } from '@/shared/components/atoms/card'
import { Skeleton } from '@/shared/components/atoms/skeleton'

export const MovieCardSkeleton = () => {
  return (
    <Card.Root className="h-[281px] w-full cursor-default overflow-hidden rounded-md p-0 shadow-[0_0px_5px_rgba(0,0,0,0.2)] sm:h-[355px]">
      <Card.Content className="h-full w-full p-0">
        <Skeleton className="h-full w-full rounded-md" />
      </Card.Content>
    </Card.Root>
  )
}
