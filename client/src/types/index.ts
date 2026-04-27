export interface MenuItem {
  id: number
  name: string
  nameEn: string
  category: string
  price: number
  description: string
  image: string
  emoji: string
  spicy?: boolean
  recommended?: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Reservation {
  id: number
  name: string
  phone: string
  date: string
  time: string
  guests: number
  notes?: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export interface User {
  id: number
  username: string
  phone: string
  points: number
  vipLevel: string
}

export interface Order {
  id: number
  userId: number
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'delivering' | 'completed'
  createdAt: string
  address?: string
}
