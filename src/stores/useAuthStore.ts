import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import encryptedSessionStorage from './encryptedSessionStorage'

import type { LoginUser } from '@/types'

interface AuthState {
  loginUser: LoginUser | undefined
  redirectTo: string | undefined
  setLoginUser: (loginUser: LoginUser | undefined) => void
  resetLoginUser: () => void
  setRedirectTo: (redirectTo: string | undefined) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loginUser: undefined,
      redirectTo: undefined,
      setLoginUser: (loginUser: LoginUser | undefined) =>
        set((state) => ({ ...state, loginUser })),
      resetLoginUser: () => set((state) => ({ ...state, undefined })),
      setRedirectTo: (redirectTo: string | undefined) =>
        set((state) => ({ ...state, redirectTo })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => encryptedSessionStorage),
    },
  ),
)

export default useAuthStore
