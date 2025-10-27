import { Button } from '@/shared/components/atoms/button'
import { Input } from '@/shared/components/atoms/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/atoms/popover'
import { VStack } from '@/shared/components/atoms/vstack'
import { cn } from '@/shared/utils'
import { Calendar } from '@/shared/components/atoms/calendar'
import { DateRange } from 'react-day-picker'
import { CalendarIcon } from 'lucide-react'

export type ReleaseIntervalDateInputProps = {
  dateRange: DateRange
  setDateRange: (dateRange: DateRange) => void
}

export const ReleaseIntervalDateInput = ({
  dateRange,
  setDateRange,
}: ReleaseIntervalDateInputProps) => {
  return (
    <Input.Root>
      <VStack className="gap-2">
        <Input.Label>Data de Lançamento</Input.Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'flex w-full items-center justify-start gap-2 font-normal [&>div]:flex [&>div]:w-full [&>div]:items-center [&>div]:justify-start [&>div]:gap-2',
                !dateRange?.from && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {dateRange?.from
                  ? dateRange?.to
                    ? `${dateRange.from.toLocaleDateString('pt-BR')} - ${dateRange.to.toLocaleDateString('pt-BR')}`
                    : dateRange.from.toLocaleDateString('pt-BR')
                  : 'Selecione o período'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              captionLayout="dropdown"
              fromYear={1900}
              toYear={new Date().getFullYear() + 10}
              required
            />
          </PopoverContent>
        </Popover>
      </VStack>
    </Input.Root>
  )
}
