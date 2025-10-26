import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/shared/components/atoms/input'
import { VStack } from '@/shared/components/atoms/vstack'
import { SearchIcon } from '@/shared/icons/SearchIcon'

export type DebounceInputProps = {
  label: string
  placeholder?: string
  debounceMs?: number
  onValueChange: (value: string) => void
  defaultValue?: string
}

export const DebounceInput = ({
  label,
  placeholder,
  debounceMs = 1000,
  onValueChange,
  defaultValue = '',
}: DebounceInputProps) => {
  const [value, setValue] = useState(defaultValue)

  // Sync local state with external default value changes
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onValueChange(value)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [value, debounceMs, onValueChange])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return (
    <Input.Root className="relative w-full max-w-[488px]">
      <VStack className="gap-2">
        <Input.Field
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <SearchIcon className="absolute right-5 top-1/2 size-6 -translate-y-1/2 text-gray-400" />
      </VStack>
    </Input.Root>
  )
}
