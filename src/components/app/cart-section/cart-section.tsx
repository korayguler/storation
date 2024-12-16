'use client'

import { Button, Card } from '@/components'
import { useCartStore } from '@/stores'
import { formatPrice, strLimit } from '@/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'

export const CartSection = () => {
  const { addToCart, cart, removeFromCart, total } = useCartStore()

  return (
    <>
      {cart?.length > 0 && (
        <Card title="Cart">
          {cart.map((item) => (
            <div className="flex items-start justify-between" key={item.id}>
              <div className="flex flex-col select-none">
                <span className="text-xs">{strLimit(item.name, 18)}</span>
                <span className="text-[10px] text-[#2A59FE]">
                  {formatPrice(item.price)}
                </span>
              </div>
              <div className="flex items-center">
                <span
                  onClick={() => removeFromCart(item.id)}
                  className="size-[27px] flex items-center justify-center cursor-pointer bg-gray-400/5 rounded-tl-[4px] rounded-bl-[4px]"
                >
                  <MinusIcon size={16} />
                </span>
                <span className="bg-[#2A59FE] text-white size-[27px] flex items-center justify-center select-none">
                  {item.quantity}
                </span>
                <span
                  onClick={() => addToCart(item)}
                  className="size-[27px] flex items-center justify-center cursor-pointer bg-gray-400/5 rounded-br-[4px] rounded-tr-[4px]"
                >
                  <PlusIcon size={16} />
                </span>
              </div>
            </div>
          ))}
        </Card>
      )}
      <Card title="Checkout">
        <div className="space-y-2">
          <div>
            <span>TotalPrice:</span>

            <span className="text-[#2A59FE] font-bold"> {total()}</span>
          </div>
          <Button
            className="text-[13px]"
            onClick={() => {
              alert('Checkout')
            }}
          >
            Checkout
          </Button>
        </div>
      </Card>
    </>
  )
}
