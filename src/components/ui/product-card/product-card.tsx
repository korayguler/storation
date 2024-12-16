import Image from 'next/image'
import { ProductCardProps } from './product-card.types'
import { formatPrice, strLimit } from '@/utils'
import { AddToCartButton } from '@/components'
import Link from 'next/link'

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="p-2.5 h-fit bg-white shadow-md">
      <Link href={`/${product.id}`} className="space-y-[15px] mb-[15px] block">
        <div className="relative w-full h-[150px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes={'(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'}
            quality={50}
          />
        </div>
        <span className="text-[#2A59FE] text-sm block">
          {formatPrice(product.price)}
        </span>
        <h2 className="text-sm font-medium h-10">{strLimit(product.name, 18)}</h2>
      </Link>
      <AddToCartButton product={product} />
    </div>
  )
}
