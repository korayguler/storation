import { env } from '@/configs'

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${env.API_URL}/products/${id}`)
    if (!response.ok) {
      throw response
    }

    return response.json()
  } catch (e) {
    if (e instanceof Response && e.status === 404) {
      return null
    }
  }
}

type TGetProducts = {
  page: number | string
  limit: number
  search?: string
  order?: string
  brand?: string
  model?: string
  orderBy?: string
}

export const getProducts = async ({
  page,
  limit,
  search,
  order,
  brand,
  model,
  orderBy,
}: TGetProducts) => {
  try {
    const params = new URLSearchParams(
      Object.entries({
        page: page.toString(),
        limit: limit.toString(),
        name: search,
        order,
        brand,
        model,
        orderBy,
      }).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value
        }
        return acc
      }, {} as Record<string, string>)
    )

    const response = await fetch(`${env.API_URL}/products?${params.toString()}`)

    if (!response.ok) {
      throw response
    }

    return response.json()
  } catch (e) {
    if (e instanceof Response && e.status === 404) {
      return []
    }
  }
}
