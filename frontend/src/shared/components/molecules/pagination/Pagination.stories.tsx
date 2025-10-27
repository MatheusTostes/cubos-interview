import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './index'
import { useState } from 'react'

const meta: Meta<typeof Pagination.Root> = {
  title: 'Components/Molecules/Pagination',
  component: Pagination.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 10

    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }

    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1)
      }
    }

    const handlePageClick = (page: number) => {
      setCurrentPage(page)
    }

    const getPageNumbers = () => {
      const pages: number[] = []
      const maxVisible = 5

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
        } else if (currentPage >= totalPages - 2) {
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            pages.push(i)
          }
        }
      }

      return pages
    }

    return (
      <Pagination.Root>
        <Pagination.PreviousButton
          onClick={handlePrevious}
          disabled={currentPage === 1}
        />
        {getPageNumbers().map((page) => (
          <Pagination.PageButton
            key={page}
            pageNumber={page}
            isActive={currentPage === page}
            onClick={() => handlePageClick(page)}
          />
        ))}
        <Pagination.NextButton
          onClick={handleNext}
          disabled={currentPage === totalPages}
        />
      </Pagination.Root>
    )
  },
}
