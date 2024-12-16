'use client'

import { useProductParams } from '@/hooks'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Fragment } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const { setPage, page } = useProductParams()
  const currentPage = Number(page)
  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (page >= 1 && page <= totalPages) {
      setPage(page.toString())
    }
  }

  const getPageNumbers = () => {
    const pages = []
    const delta = 2

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-transparent text-gray-300 cursor-pointer"
      >
        <ChevronLeftIcon size={16} />
      </button>

      {pages.map((page, index) => (
        <Fragment key={index}>
          {page === '...' ? (
            <span className="px-4 py-2 text-gray-500">...</span>
          ) : (
            <span
              onClick={() => handlePageChange(Number(page))}
              className={`px-4 py-2 rounded cursor-pointer ${
                page === currentPage
                  ? 'rounded-xl bg-white shadow-lg'
                  : 'bg-transparent'
              }`}
            >
              {page}
            </span>
          )}
        </Fragment>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded bg-transparent text-gray-300 cursor-pointer"
      >
        <ChevronRightIcon size={16} />
      </button>
    </div>
  )
}
