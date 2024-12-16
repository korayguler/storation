import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server'
import { UpdateQueryString } from './utils.types'

export const formatPrice = (price: number | string) => {
  return (
    Number(price)
      .toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .trim()
      .replace('₺', '') + ' ₺'
  )
}

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  model: parseAsString.withDefault(''),
  brand: parseAsString.withDefault(''),
  order: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
})

export const updateQueryString: UpdateQueryString = (queryString, value) => {
  if (!queryString.trim()) return value

  const items = queryString.split('|')
  return items.includes(value)
    ? items.filter((item) => item !== value).join('|')
    : [...items, value].join('|')
}

export const DOTS = '...'

export const strLimit = (str: string, limit: number) => {
  return str.length > limit ? `${str.slice(0, limit)}...` : str
}
