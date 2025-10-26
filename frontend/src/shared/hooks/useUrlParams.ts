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
    (updates: Partial<UrlParams>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)

        Object.entries(updates).forEach(([key, value]) => {
          if (value === undefined || value === null || value === '') {
            newParams.delete(key)
          } else {
            newParams.set(key, value)
          }
        })

        // Manually handle commas for genres to avoid encoding
        if (updates.genres) {
          const genresValue = updates.genres.replace(',', '%2C')
          newParams.set('genres', genresValue)
        }

        return newParams
      })
    },
    [] // Remove setSearchParams from dependencies to stabilize
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
