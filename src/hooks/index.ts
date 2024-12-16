import { updateQueryString } from '@/utils'
import { useQueryStates } from 'nuqs'

export function useProductParams() {
  const [{ model, page, brand, order, search }, setParams] = useQueryStates(
    {
      model: {
        defaultValue: '',
        parse: (value) => value || '',
      },
      brand: {
        defaultValue: '',
        parse: (value) => value || '',
      },
      search: {
        defaultValue: '',
        parse: (value) => value || '',
      },
      order: {
        defaultValue: '',
        parse: (value) => value || '',
      },
      page: {
        defaultValue: '1',
        parse: (value) => value || '1',
      },
    },
    {
      history: 'push',
      shallow: false,
    }
  )
  const setBrand = (payload: string) => {
    const newValue = updateQueryString(brand, payload)
    setParams({ brand: newValue, page: '1' })
  }

  const setModel = (payload: string) => {
    const newValue = updateQueryString(model, payload)
    setParams({ model: newValue, page: '1' })
  }
  const setPage = (payload: string) => {
    setParams({ page: payload })
  }

  const setSearch = (payload: string) => {
    setParams({ search: payload, page: '1' })
  }

  const setOrder = (payload: string) => {
    setParams({ order: payload, page: '1' })
  }

  return {
    setModel,
    model,
    brand,
    setBrand,
    page,
    setPage,
    order,
    search,
    setSearch,
    setOrder,
  }
}
