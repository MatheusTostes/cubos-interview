import { useSearchParams } from 'react-router-dom'
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
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo(() => {
    const genresParam = searchParams.get('genres')
    return {
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || undefined,
      genres: genresParam || undefined,
      durationMin: searchParams.get('durationMin') || undefined,
      durationMax: searchParams.get('durationMax') || undefined,
      releaseDateStart: searchParams.get('releaseDateStart') || undefined,
      releaseDateEnd: searchParams.get('releaseDateEnd') || undefined,
    }
  }, [searchParams])

  const updateParams = useCallback(
    (updates: Partial<UrlParams>) => {
      const newParams = new URLSearchParams(searchParams)

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

      setSearchParams(newParams, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }, [setSearchParams])

  return {
    params,
    updateParams,
    clearParams,
  }
}
