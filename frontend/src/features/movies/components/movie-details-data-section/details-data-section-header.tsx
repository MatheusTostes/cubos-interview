import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { Button } from '@/shared/components/atoms/button'

export type DetailsDataSectionHeaderProps = {
  title: string
  originalTitle: string
}

export const DetailsDataSectionHeader = ({
  title,
  originalTitle,
}: DetailsDataSectionHeaderProps) => {
  return (
    <HStack className="flex-col-reverse justify-between gap-2 min-[540px]:flex-row">
      <VStack className="w-full items-center min-[540px]:items-start">
        <Typography
          variant="h2"
          className="text-[32px] font-semibold"
          font="montserrat"
        >
          {title}
        </Typography>
        <Typography variant="span" font="montserrat">
          Título Original: {originalTitle}
        </Typography>
      </VStack>

      <HStack className="my-auto gap-4">
        <Button variant="secondary">Deletar</Button>
        <Button className="w-full min-[540px]:w-auto">Editar</Button>
      </HStack>
    </HStack>
  )
}
