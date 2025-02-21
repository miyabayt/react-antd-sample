import { create } from 'zustand'

import type { LoginUser } from '@/types'

interface AuthState {
  loginUser: LoginUser | null
  redirectTo: string | null
  accessToken: string | null
  setLoginUser: (loginUser: LoginUser | null) => void
  resetLoginUser: () => void
  setRedirectTo: (redirectTo: string | null) => void
  setAccessToken: (accessToken: string | null) => void
}

const useAuthStore = create<AuthState>()((set) => ({
  loginUser: null,
  redirectTo: null,
  accessToken: null,
  setLoginUser: (loginUser: LoginUser | null) =>
    set((state) => ({ ...state, loginUser })),
  resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
  setRedirectTo: (redirectTo: string | null) =>
    set((state) => ({ ...state, redirectTo })),
  setAccessToken: (accessToken: string | null) =>
    set((state) => ({ ...state, accessToken })),
}))

export default useAuthStore
