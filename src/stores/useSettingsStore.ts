import type { ColumnState, GridState } from 'ag-grid-community'
import _ from 'lodash'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GridStates {
  [key: string]: GridState
}

interface ColumnStates {
  [key: string]: ColumnState[]
}

interface SettingsState {
  sidebarCollapsed: boolean
  menuOpenKeys: string[]
  activeMenuKeys: string[]
  gridStates: GridStates
  columnStatesMap: ColumnStates
  setSidebarCollapsed: (collapsed: boolean) => void
  setMenuOpenKeys: (openKeys: string[]) => void
  setActiveMenuKeys: (activeMenuKeys: string[]) => void
  setGridState: (path: string, gridState: GridState) => void
  setColumnStatesMap: (path: string, columnStates: ColumnState[]) => void
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      menuOpenKeys: [''],
      activeMenuKeys: [''],
      gridStates: {},
      columnStatesMap: {},
      setSidebarCollapsed: (sidebarCollapsed: boolean) =>
        set((state) => {
          if (state.sidebarCollapsed === sidebarCollapsed) {
            return state
          }
          return { sidebarCollapsed }
        }),
      setMenuOpenKeys: (menuOpenKeys: string[]) =>
        set((state) => {
          if (_.isEqual(state.menuOpenKeys, menuOpenKeys)) {
            return state
          }
          return { menuOpenKeys }
        }),
      setActiveMenuKeys: (activeMenuKeys: string[]) =>
        set((state) => {
          if (_.isEqual(state.activeMenuKeys, activeMenuKeys)) {
            return state
          }
          return { activeMenuKeys }
        }),
      setGridState: (path, gridState) => {
        set((state) => {
          if (_.isEqual(state.gridStates[path], gridState)) {
            return state
          }
          return {
            gridStates: {
              ...state.gridStates,
              [path]: gridState,
            },
          }
        })
      },
      setColumnStatesMap: (path, columnStates) => {
        set((state) => {
          if (_.isEqual(state.columnStatesMap[path], columnStates)) {
            return state
          }
          return {
            columnStatesMap: {
              ...state.columnStatesMap,
              [path]: columnStates,
            },
          }
        })
      },
    }),
    {
      name: 'settings-storage',
    },
  ),
)

export default useSettingsStore
