'use client'

import { FilterGroup } from '@/components'
import { useProductParams } from '@/hooks'

const MODEL_FILTERS = [
  { id: 'cts', name: 'CTS' },
  { id: 'roadster', name: 'Roadster' },
  { id: 'taurus', name: 'Taurus' },
  { id: 'jetta', name: 'Jetta' },
]

const BRAND_FILTERS = [
  { id: 'mercedes benz', name: 'Mercedes Benz' },
  { id: 'tesla', name: 'Tesla' },
  { id: 'land rover', name: 'Land Rover' },
  { id: 'maserati', name: 'Maserati' },
]

const SORT_FILTERS = [
  { id: 'createdAt-asc', name: 'Old to New' },
  { id: 'createdAt-desc', name: 'New to Old' },
  { id: 'price-desc', name: 'Price Hight to low' },
  { id: 'price-asc', name: 'Price Low to high' },
]

export const FilterSection = () => {
  const { setBrand, setModel, brand, model, order, setOrder } =
    useProductParams()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    action: 'brand' | 'model' | 'order'
  ) => {
    const { id } = e.target
    if (action === 'brand') {
      setBrand(id)
    } else if (action === 'model') {
      setModel(id)
    } else {
      setOrder(id)
    }
  }

  return (
    <>
      <FilterGroup
        title="Sort By"
        type="radio"
        items={SORT_FILTERS}
        onChange={(e) => handleChange(e, 'order')}
        value={order}
      />
      <FilterGroup
        title="Brands"
        items={BRAND_FILTERS}
        onChange={(e) => handleChange(e, 'brand')}
        value={brand}
        showSearch
      />
      <FilterGroup
        title="Model"
        items={MODEL_FILTERS}
        onChange={(e) => handleChange(e, 'model')}
        value={model}
        showSearch
      />
    </>
  )
}
