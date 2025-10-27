import { useSearchParams, useLocation } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

interface UrlParams {
  search?: string
  page?: string
  genres?: string[] // Array of genre IDs
  classifications?: string[] // Array of classification IDs
  situations?: string[] // Array of situation IDs
  durationMin?: string
  durationMax?: string
  releaseDateStart?: string
  releaseDateEnd?: string
}

export const useUrlParams = () => {
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()

  const params = useMemo(() => {
    const searchParamsObj = new URLSearchParams(location.search)
    
    // Helper function to convert comma-separated string to array or get all values
    const getArrayParam = (key: string): string[] | undefined => {
      const allValues = searchParamsObj.getAll(key)
      if (allValues.length > 0) {
        // If we have multiple values from repeated keys (e.g., ?genres=1&genres=2)
        return allValues
      }
      // Otherwise, check if we have a comma-separated string (e.g., ?genres=1,2)
      const singleValue = searchParamsObj.get(key)
      if (singleValue) {
        return singleValue.split(',').filter(Boolean)
      }
      return undefined
    }
    
    return {
      search: searchParamsObj.get('search') || undefined,
      page: searchParamsObj.get('page') || undefined,
      genres: getArrayParam('genres'),
      classifications: getArrayParam('classifications'),
      situations: getArrayParam('situations'),
      durationMin: searchParamsObj.get('durationMin') || undefined,
      durationMax: searchParamsObj.get('durationMax') || undefined,
      releaseDateStart: searchParamsObj.get('releaseDateStart') || undefined,
      releaseDateEnd: searchParamsObj.get('releaseDateEnd') || undefined,
    }
  }, [location.search])

  const updateParams = useCallback(
    (updates: Partial<UrlParams>, options?: { removePage?: boolean }) => {
      // Read current params directly from location to ensure we have the latest state
      const currentParams = new URLSearchParams(location.search)

      // Create a new URLSearchParams that preserves all existing params
      const newParams = new URLSearchParams(currentParams)

      // If removePage option is set (e.g., when applying filters), remove page param
      if (options?.removePage) {
        newParams.delete('page')
      }

      // Apply updates - only update the specified params
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          newParams.delete(key)
        } else if (Array.isArray(value)) {
          // If value is an array, delete existing and add all values
          newParams.delete(key)
          if (value.length > 0) {
            // Add each value as a separate query param (e.g., ?genres=1&genres=2)
            value.forEach((v) => newParams.append(key, v))
          }
        } else {
          newParams.set(key, value as string)
        }
      })

      setSearchParams(newParams)
    },
    [location.search] // Include location.search in dependencies
  )

  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }, []) // Remove setSearchParams from dependencies to stabilize

  return {
    params,
    updateParams,
    clearParams,
  }
}
