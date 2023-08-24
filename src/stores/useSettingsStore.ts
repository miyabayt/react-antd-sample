import { persist, createJSONStorage } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

interface SettingsState {
  collapsed: boolean
  openKeys: string[]
  activeMenuKeys: string[]
  setCollapsed: (collapsed: boolean) => void
  setOpenKeys: (openKeys: string[]) => void
  setActiveMenuKeys: (activeMenuKeys: string[]) => void
}

const useSettingsStore = createWithEqualityFn<SettingsState>()(
  persist(
    (set) => ({
      collapsed: false,
      openKeys: [''],
      activeMenuKeys: [''],
      setCollapsed: (collapsed: boolean) =>
        set((state) => ({ ...state, collapsed })),
      setOpenKeys: (openKeys: string[]) =>
        set((state) => ({ ...state, openKeys })),
      setActiveMenuKeys: (activeMenuKeys: string[]) =>
        set((state) => ({ ...state, activeMenuKeys })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
  Object.is, // Specify the default equality function, which can be shallow
)

export default useSettingsStore
