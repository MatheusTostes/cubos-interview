import { VStack } from '@/shared/components/atoms/vstack'
import { Typography } from '@/shared/components/atoms/typography'
import { cn } from '@/shared/utils/utils'

export type RatingCircleGraphProps = {
  rating: number
  className?: string
}

export const RatingCircleGraph = ({
  rating,
  className,
}: RatingCircleGraphProps) => {
  const percentage = (rating / 10) * 100
  const radius = 50
  const circumference = 2 * Math.PI * radius

  const calculateRatingPercentage = (rating: number) => {
    return (rating / 10) * 100
  }

  return (
    <VStack className={cn('relative scale-125', className)}>
      <svg width="128" height="128" className="-rotate-90 transform">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="gray"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#FFD700"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${(percentage / 100) * circumference}, ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
        <Typography
          variant="span"
          font="montserrat"
          className="text-2xl text-yellow-400"
        >
          {calculateRatingPercentage(rating).toFixed(0)}
        </Typography>
        <Typography variant="span" className="mt-2 text-xs text-white">
          %
        </Typography>
      </div>
    </VStack>
  )
}
