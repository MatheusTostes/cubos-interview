import { HStack } from '@/shared/components/atoms/hstack'
import { Input } from '@/shared/components/atoms/input'
import { VStack } from '@/shared/components/atoms/vstack'

export type DurationInputSliderProps = {
  durationRange: { min: number; max: number }
  setDurationRange: (durationRange: { min: number; max: number }) => void
}

export const DurationInputSlider = ({
  durationRange,
  setDurationRange,
}: DurationInputSliderProps) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${mins.toString().padStart(2, '0')}`
  }

  return (
    <Input.Root>
      <VStack className="gap-2">
        <HStack className="justify-between">
          <Input.Label>Duração</Input.Label>

          <span className="font-medium">
            {formatDuration(durationRange.min * 30)} -{' '}
            {formatDuration(durationRange.max * 30)}
          </span>
        </HStack>

        <div className="space-y-4">
          <div className="mr-3 space-y-4 px-2">
            {/* Range Slider Customizado */}
            <div className="space-y-2">
              <div className="relative h-6 px-2">
                {/* Barra de fundo */}
                <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-muted" />

                {/* Barra de progresso */}
                <div
                  className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary"
                  style={{
                    left: `${(durationRange.min / 10) * 100 + 2}%`,
                    width: `${((durationRange.max - durationRange.min) / 10) * 100}%`,
                  }}
                />

                {/* Seletor mínimo */}
                <div
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary shadow-lg transition-all hover:scale-110"
                  style={{ left: `${(durationRange.min / 10) * 100 + 2}%` }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    const sliderContainer = e.currentTarget.parentElement
                    if (!sliderContainer) return

                    const startX = e.clientX
                    const startValue = durationRange.min
                    const containerRect =
                      sliderContainer.getBoundingClientRect()

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const deltaX = moveEvent.clientX - startX
                      const deltaValue = Math.round(
                        (deltaX / containerRect.width) * 10
                      )
                      const newValue = Math.max(
                        0,
                        Math.min(10, startValue + deltaValue)
                      )

                      if (newValue < durationRange.max) {
                        setDurationRange({
                          min: newValue,
                          max: durationRange.max,
                        })
                      }
                    }

                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove)
                      document.removeEventListener('mouseup', handleMouseUp)
                    }

                    document.addEventListener('mousemove', handleMouseMove)
                    document.addEventListener('mouseup', handleMouseUp)
                  }}
                />

                {/* Seletor máximo */}
                <div
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary shadow-lg transition-all hover:scale-110"
                  style={{ left: `${(durationRange.max / 10) * 100 + 2}%` }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    const sliderContainer = e.currentTarget.parentElement
                    if (!sliderContainer) return

                    const startX = e.clientX
                    const startValue = durationRange.max
                    const containerRect =
                      sliderContainer.getBoundingClientRect()

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const deltaX = moveEvent.clientX - startX
                      const deltaValue = Math.round(
                        (deltaX / containerRect.width) * 10
                      )
                      const newValue = Math.max(
                        0,
                        Math.min(10, startValue + deltaValue)
                      )

                      if (newValue > durationRange.min) {
                        setDurationRange({
                          min: durationRange.min,
                          max: newValue,
                        })
                      }
                    }

                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove)
                      document.removeEventListener('mouseup', handleMouseUp)
                    }

                    document.addEventListener('mousemove', handleMouseMove)
                    document.addEventListener('mouseup', handleMouseUp)
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0:00</span>
            <span>0:30</span>
            <span>1:00</span>
            <span>1:30</span>
            <span>2:00</span>
            <span>2:30</span>
            <span>3:00</span>
            <span>3:30</span>
            <span>4:00</span>
            <span>4:30</span>
            <span>5:00</span>
          </div>
        </div>
      </VStack>
    </Input.Root>
  )
}
