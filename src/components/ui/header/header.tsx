'use client'

import { Container } from '@/components'
import { useProductParams } from '@/hooks'
import { useCartStore } from '@/stores'
import { SearchIcon, ShoppingBagIcon, UserRoundIcon } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  const { setSearch } = useProductParams()
  const { total } = useCartStore()
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      window.scrollTo(0, 0)
      window.history.pushState({}, '', '/')
      setSearch(e.currentTarget.value.trim())
      e.currentTarget.value = ''
    }
  }

  return (
    <header className="bg-[#2A59FE] h-[50px] flex items-center justify-center text-white mb-[33px]">
      <Container>
        <div className="grid grid-cols-3 xl:grid-cols-5 justify-between items-center w-full">
          <Link href="/" className="text-2xl font-extrabold  col-span-1">
            Eteration
          </Link>

          <div className="relative col-span-1 xl:col-span-3">
            <input
              type="text"
              className="w-full bg-white indent-10 py-2 pr-2 text-lg outline-none bg-gray-400/5 text-[#333333] max-w-[180px] xl:max-w-[408px] h-10"
              placeholder="Search"
              onKeyDown={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <SearchIcon size={16} className="text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-[17px] col-span-1">
            <div className="hidden items-center gap-1 cursor-pointer xl:flex">
              <ShoppingBagIcon size={16} />
              <span>{total()}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <UserRoundIcon size={16} />
              <span>Kerem</span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
