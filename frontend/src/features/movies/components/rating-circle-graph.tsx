import { VStack } from '@/shared/components/atoms/vstack'
import { Typography } from '@/shared/components/atoms/typography'

export const RatingCircleGraph = ({ rating }: { rating: number }) => {
  const percentage = (rating / 10) * 100
  const radius = 50
  const circumference = 2 * Math.PI * radius

  const calculateRatingPercentage = (rating: number) => {
    return (rating / 10) * 100
  }

  return (
    <VStack className="absolute left-[50%] top-[40%] h-32 w-32 translate-x-[-50%] translate-y-[-50%] rounded-full bg-black bg-opacity-40 backdrop-blur-sm">
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
          stroke="yellow"
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
        <Typography variant="span" className="mt-2 text-xs">
          %
        </Typography>
      </div>
    </VStack>
  )
}
