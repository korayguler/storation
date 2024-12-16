import { TProduct } from '@/types'
import { formatPrice } from '@/utils'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CartItem = TProduct & { quantity: number }

type TUseCartStore = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  total: () => string
}

export const useCartStore = create<TUseCartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: CartItem) => {
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          )

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            }
          }

          return {
            cart: [...state.cart, { ...item, quantity: 1 }],
          }
        })
      },

      removeFromCart: (id: string) => {
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.id === id)

          if (!existingItem) return state

          if (existingItem.quantity > 1) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === id
                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                  : cartItem
              ),
            }
          }

          return {
            cart: state.cart.filter((cartItem) => cartItem.id !== id),
          }
        })
      },

      total: () => {
        const total = get().cart.reduce(
          (sum, cartItem) => sum + Number(cartItem.price) * cartItem.quantity,
          0
        )

        return formatPrice(total)
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
