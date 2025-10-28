import { useSearchParams, useLocation } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

interface UrlParams {
  search?: string
  page?: string
  genres?: string[]
  classifications?: string[]
  situations?: string[]
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

    const getArrayParam = (key: string): string[] | undefined => {
      const allValues = searchParamsObj.getAll(key)
      if (allValues.length > 0) {
        return allValues
      }
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
      const currentParams = new URLSearchParams(location.search)

      const newParams = new URLSearchParams(currentParams)

      if (options?.removePage) {
        newParams.delete('page')
      }

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          newParams.delete(key)
        } else if (Array.isArray(value)) {
          newParams.delete(key)
          if (value.length > 0) {
            value.forEach((v) => newParams.append(key, v))
          }
        } else {
          newParams.set(key, value as string)
        }
      })

      setSearchParams(newParams)
    },
    [location.search]
  )

  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }, [])

  return {
    params,
    updateParams,
    clearParams,
  }
}
