import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import encryptedSessionStorage from './encryptedSessionStorage'

import type { LoginUser } from '@/types'

interface AuthState {
  loginUser: LoginUser | null
  redirectTo: string | null
  setLoginUser: (loginUser: LoginUser | null) => void
  resetLoginUser: () => void
  setRedirectTo: (redirectTo: string | null) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loginUser: null,
      redirectTo: null,
      setLoginUser: (loginUser: LoginUser | null) =>
        set((state) => ({ ...state, loginUser })),
      resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
      setRedirectTo: (redirectTo: string | null) =>
        set((state) => ({ ...state, redirectTo })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => encryptedSessionStorage),
    },
  ),
)

export default useAuthStore
