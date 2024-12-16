'use client'

import { Button } from '@/components'
import { AddToCartButtonProps } from './add-to-cart-button.types'
import { useCartStore } from '@/stores'

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart } = useCartStore()

  const handleClick = () => {
    addToCart({ ...product, quantity: 1 })
  }

  return <Button onClick={handleClick}>Add to Cart</Button>
}
