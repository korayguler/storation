'use client'

import React from 'react'
import { FilterGroupProps, FilterItem } from './filter-group.types'
import { SearchIcon } from 'lucide-react'
import { Card } from '@/components'

export const FilterGroup = ({
  title,
  items,
  type = 'checkbox',
  onChange,
  value,
  showSearch,
}: FilterGroupProps) => {
  const [search, setSearch] = React.useState('')

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase().trim())
  )

  return (
    <Card title={title}>
      {showSearch && (
        <div className="relative mb-[15px]">
          <input
            type="text"
            className="w-full indent-10 py-2 pr-2 text-sm outline-none bg-gray-400/5 text-[#333333]"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SearchIcon size={16} className="text-gray-400" />
          </div>
        </div>
      )}
      {showSearch && filteredItems.length === 0 && (
        <div className="text-center text-gray-500">Filter not found</div>
      )}
      <div className="space-y-2">
        {filteredItems?.map((item: FilterItem) => (
          <div key={item.id} className="flex items-center">
            <input
              onChange={onChange}
              type={type}
              id={item.id}
              name={value}
              checked={
                type === 'checkbox'
                  ? value?.includes(item.id)
                  : value === item.id
              }
              className="h-4 w-4 text-[#2A59FE] rounded border-gray-300 focus:ring-[#2A59FE]"
            />
            <label htmlFor={item.id} className="ml-2 text-sm text-gray-700">
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </Card>
  )
}
