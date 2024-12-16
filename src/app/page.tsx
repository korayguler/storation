import {
  ProductCard,
  Container,
  FilterSection,
  Pagination,
  CartSection,
} from '@/components'
import { getProducts } from '@/services'
import { TProduct } from '@/types'
import { searchParamsCache } from '@/utils'
import { SearchParams } from 'next/dist/server/request/search-params'

type LandingPageParams = {
  searchParams: Promise<SearchParams>
}
export default async function LandingPage({ searchParams }: LandingPageParams) {
  const { brand, model, page, search, order } = await searchParamsCache.parse(
    await searchParams
  )

  const [orderBy, orderParam] = order.split('-')

  const productParams = {
    page: page || 1,
    limit: 12,
    search,
    orderBy,
    order: orderParam,
    brand,
    model,
  }

  const products = await getProducts(productParams)

  const productsIsEmpty = products?.length === 0

  const showPagination = products?.length >= 12 && !productsIsEmpty
  return (
    <div>
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-[28px] mb-[35px]">
          <div className="xl:col-span-1 w-full">
            <FilterSection />
          </div>
          <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] w-full">
            {productsIsEmpty ? (
              <>Products not found</>
            ) : (
              products?.map((product: TProduct) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          <div className="xl:col-span-1 w-full">
            <CartSection />
          </div>
        </div>
        {showPagination && (
          <div className="mb-12">
            <Pagination currentPage={1} totalPages={21} />{' '}
          </div>
        )}
      </Container>
    </div>
  )
}
