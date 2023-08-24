import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Pages, Sorts } from '@/types/pagination'

interface PaginationState {
  pages: Pages
  sorts: Sorts
  setPagination: (
    path: string,
    pageInfo: {
      current?: number | undefined
      pageSize?: number | undefined
    },
  ) => void
  setSort: (
    path: string,
    sort: { sortField: string; sortOrder: string },
  ) => void
}

const usePaginationStore = create<PaginationState>()(
  persist(
    (set, get) => ({
      pages: {},
      sorts: {},
      setPagination: (
        path: string,
        pageInfo: {
          current?: number | undefined
          pageSize?: number | undefined
        },
      ) => {
        set((state) => {
          state.pages[path] = {
            current: pageInfo.current || 1,
            pageSize: pageInfo.pageSize || 20,
          }
          return { ...state }
        })
      },
      setSort(path: string, sort: { sortField: string; sortOrder: string }) {
        get().sorts[path] = sort
      },
    }),
    {
      name: 'pagination-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default usePaginationStore
