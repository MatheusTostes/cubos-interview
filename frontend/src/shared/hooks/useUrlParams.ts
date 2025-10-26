import { useSearchParams, useLocation } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

interface UrlParams {
  search?: string
  page?: string
  genres?: string // Comma-separated genre IDs
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
    return {
      search: searchParamsObj.get('search') || undefined,
      page: searchParamsObj.get('page') || undefined,
      genres: searchParamsObj.get('genres') || undefined,
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
        } else {
          newParams.set(key, value)
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
