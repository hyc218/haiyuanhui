import { create } from 'zustand'
import type { CartItem, MenuItem } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item: MenuItem) => {
    const items = get().items
    const existing = items.find(i => i.id === item.id)
    if (existing) {
      set({
        items: items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      })
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] })
    }
  },
  removeItem: (id: number) => {
    set({ items: get().items.filter(i => i.id !== id) })
  },
  updateQuantity: (id: number, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    set({
      items: get().items.map(i =>
        i.id === id ? { ...i, quantity } : i
      )
    })
  },
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}))
