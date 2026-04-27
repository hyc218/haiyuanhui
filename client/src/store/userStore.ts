import { create } from 'zustand'
import type { User } from '../types'

interface UserStore {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
  updatePoints: (points: number) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user: User) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  updatePoints: (points: number) =>
    set((state) => ({
      user: state.user ? { ...state.user, points } : null
    }))
}))
