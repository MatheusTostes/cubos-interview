import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from './index'
import { useState } from 'react'
import { Button } from '@/shared/components/atoms/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/atoms/popover'
import { Typography } from '@/shared/components/atoms/typography'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/shared/utils/utils'

const meta: Meta<typeof Calendar> = {
  title: 'Components/Atoms/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    )
  },
}

export const DateRange: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({})

    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-md border"
      />
    )
  },
}

export const WithPopover: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? date.toLocaleDateString() : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  },
}

export const DateRangeWithPopover: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({})

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !range.from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range.from
              ? range.to
                ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                : range.from.toLocaleDateString()
              : 'Pick a date range'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  },
}

export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()

    // Disable dates before today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) => date < today}
        className="rounded-md border"
      />
    )
  },
}

export const WithMultipleMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date>()

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className="rounded-md border"
      />
    )
  },
}

export const FiltersExample: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    return (
      <div className="space-y-4">
        <Typography variant="h4" font="montserrat" className="font-semibold">
          Date Range Filter
        </Typography>

        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[200px] justify-start text-left font-normal',
                  !startDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? startDate.toLocaleDateString() : 'Start date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) => (endDate ? date > endDate : false)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[200px] justify-start text-left font-normal',
                  !endDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? endDate.toLocaleDateString() : 'End date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) => (startDate ? date < startDate : false)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {startDate && endDate && (
          <Typography variant="small" className="text-muted-foreground">
            Selected range: {startDate.toLocaleDateString()} to{' '}
            {endDate.toLocaleDateString()}
          </Typography>
        )}
      </div>
    )
  },
}
