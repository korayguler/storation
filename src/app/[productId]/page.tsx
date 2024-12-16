import { AddToCartButton, Card, CartSection, Container } from '@/components'
import { getProductById } from '@/services'
import { formatPrice, strLimit } from '@/utils'
import Image from 'next/image'

type ProductDetailsPageParams = {
  params: {
    productId: string
  }
}

export default async function ProductPage({
  params,
}: ProductDetailsPageParams) {
  const { productId } = await params
  const product = await getProductById(productId)

  return (
    <Container>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-[28px]">
        <div className="xl:col-span-4">
          <Card>
            <div className="flex flex-col xl:flex-row gap-[30px]">
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={480}
                className="w-full xl:w-[550px] h-[400px] object-cover"
                quality={50}
              />

              <div>
                <h1 className="text-2xl mb-2.5">{product.name}</h1>
                <span className="font-medium text-2xl mb-[50px] block">
                  {formatPrice(product.price)}
                </span>
                <AddToCartButton product={product} />
                <p className="mt-[19px]">
                  {strLimit(product.description, 470)}
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <CartSection />
        </div>
      </div>
    </Container>
  )
}
