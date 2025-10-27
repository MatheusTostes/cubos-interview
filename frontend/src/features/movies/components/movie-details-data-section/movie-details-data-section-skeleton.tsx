import { Skeleton } from '@/shared/components/atoms/skeleton'
import { DetailsDataSectionHeaderSkeleton } from './details-data-section-header-skeleton'

export const MovieDetailsDataSectionSkeleton = () => {
  return (
    <>
      {/* Imagem no mobile */}
      <Skeleton className="block h-96 w-full min-[940px]:hidden" />

      {/* Header */}
      <DetailsDataSectionHeaderSkeleton />

      {/* Content skeleton */}
      <div className="grid gap-4 pt-4 xs:grid-cols-2">
        {/* Coluna 1 */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </>
  )
}
