import { Container } from '@/shared/components/atoms/container'
import { Skeleton } from '@/shared/components/atoms/skeleton'
import { DetailsDataSectionHeaderSkeleton } from './details-data-section-header-skeleton'

export const MovieDetailsDataSectionSkeleton = () => {
  return (
    <Container className="relative w-full overflow-hidden p-0">
      {/* Background skeleton */}
      <Container className="absolute inset-0 hidden bg-mauve-700 min-[540px]:block" />

      {/* Overlay gradient */}
      <Container className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/40 dark:from-black/100 dark:via-black/85 dark:to-black/40" />

      {/* Content with skeleton */}
      <Container className="relative gap-4 p-0 px-3 min-[540px]:p-3">
        {/* Imagem no mobile */}
        <Skeleton className="block h-96 w-full min-[940px]:hidden" />

        {/* Header */}
        <DetailsDataSectionHeaderSkeleton />

        {/* Content skeleton */}
        <div className="flex min-w-0 gap-4 pt-4">
          {/* Imagem no desktop - aparece apenas em telas maiores que 940px */}
          <Skeleton className="hidden h-[572px] w-[374px] flex-shrink-0 rounded-sm min-[940px]:block" />

          {/* Conteúdo principal - ocupa todo o espaço restante */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {/* Seção superior - Subtitle + User Statistics */}
            <div className="flex min-w-0 flex-col-reverse items-center gap-6 min-[1145px]:flex-row">
              {/* Subtitle */}
              <div className="w-full items-center p-0 min-[1145px]:w-1/2 min-[1145px]:items-start min-[1145px]:p-4">
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* User Statistics */}
              <div className="flex h-20 w-full items-center gap-4 min-[1145px]:w-1/2">
                <Skeleton className="h-16 w-32" />
                <Skeleton className="h-16 w-32" />
                <Skeleton className="h-20 w-20 rounded-full" />
              </div>
            </div>

            {/* Seção inferior - Movie Infos */}
            <div className="flex flex-col gap-6 min-[1145px]:flex-row">
              {/* Coluna 1 - Sinopse + Gêneros */}
              <div className="flex w-full flex-col gap-6 min-[1145px]:w-1/2">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-32 w-full" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Coluna 2 - Informações do filme */}
              <div className="flex w-full flex-col gap-6 min-[1145px]:w-1/2">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-16 w-1/2" />
                    <Skeleton className="h-16 w-1/2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-16 w-1/2" />
                    <Skeleton className="h-16 w-1/2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-16 w-1/3" />
                    <Skeleton className="h-16 w-1/3" />
                    <Skeleton className="h-16 w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  )
}
