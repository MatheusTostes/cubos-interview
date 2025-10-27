import { HStack } from '@/shared/components/atoms/hstack'
import { VStack } from '@/shared/components/atoms/vstack'
import { Skeleton } from '@/shared/components/atoms/skeleton'

export const DetailsDataSectionHeaderSkeleton = () => {
  return (
    <HStack className="flex-col-reverse justify-between gap-2 min-[540px]:flex-row">
      <VStack className="w-full items-center gap-2 min-[540px]:items-start">
        {/* Título principal */}
        <Skeleton className="h-8 w-3/4 min-[540px]:h-10" />
        {/* Subtítulo */}
        <Skeleton className="h-5 w-1/2" />
      </VStack>

      {/* Botões de ação */}
      <HStack className="my-auto gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </HStack>
    </HStack>
  )
}
