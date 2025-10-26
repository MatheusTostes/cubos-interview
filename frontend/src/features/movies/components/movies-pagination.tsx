import { Pagination } from '@/shared/components/molecules/pagination'
import { useUrlParams } from '@/shared/hooks/useUrlParams'

export type MoviesPaginationProps = {
  totalPages: number
}

export const MoviesPagination = ({ totalPages }: MoviesPaginationProps) => {
  const { params, updateParams } = useUrlParams()

  // Get page number from URL, default to 1
  const pageNumber = params?.page
    ? Math.max(1, Math.min(totalPages, Number(params.page)))
    : 1

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateParams({ page: page.toString() })
    }
  }

  // Calculate which page buttons to show (5 buttons total: 2 before, current, 2 after)
  const getVisiblePages = () => {
    const visibleCount = 5
    let startPage = Math.max(1, pageNumber - 2)
    let endPage = Math.min(totalPages, pageNumber + 2)

    // If we're near the start, show more pages at the end
    if (pageNumber <= 3) {
      startPage = 1
      endPage = Math.min(totalPages, visibleCount)
    }

    // If we're near the end, show more pages at the start
    if (pageNumber >= totalPages - 2) {
      startPage = Math.max(1, totalPages - visibleCount + 1)
      endPage = totalPages
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    )
  }

  const visiblePages = getVisiblePages()

  return (
    <Pagination.Root className="mx-auto">
      <Pagination.PreviousButton
        onClick={() => handlePageChange(Math.max(1, pageNumber - 1))}
        disabled={pageNumber <= 1}
      />
      {visiblePages.map((pageNum) => {
        const isActive = pageNum === pageNumber

        return (
          <Pagination.PageButton
            key={pageNum}
            pageNumber={pageNum}
            isActive={isActive}
            onClick={() => handlePageChange(pageNum)}
          />
        )
      })}
      <Pagination.NextButton
        onClick={() => handlePageChange(Math.min(totalPages, pageNumber + 1))}
        disabled={pageNumber >= totalPages}
      />
    </Pagination.Root>
  )
}
