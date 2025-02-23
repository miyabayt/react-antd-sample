import { DEFAULT_PAGE_SIZE } from '@/configs/app'
import type {
  PageInfo,
  Pages,
  Pagination,
  Sort,
  Sorts,
} from '@/types/pagination'
import _ from 'lodash'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PaginationState {
  pages: Pages
  sorts: Sorts
  setPagination: (path: string, pageInfo: PageInfo) => void
  setSort: (path: string, sort: Sort | Sort[]) => void
}

const usePaginationStore = create<PaginationState>()(
  persist(
    (set) => ({
      pages: {},
      sorts: {},
      setPagination: (path: string, pageInfo: PageInfo) =>
        set((state) => {
          const currentPagination = state.pages[path]
          const newPagination: Pagination = {
            current: pageInfo.current || 0,
            pageSize:
              pageInfo?.pageSize ||
              currentPagination?.pageSize ||
              DEFAULT_PAGE_SIZE,
          }

          if (_.isEqual(currentPagination, newPagination)) {
            return state
          }

          return {
            pages: {
              ...state.pages,
              [path]: newPagination,
            },
          }
        }),
      setSort: (path: string, sort: Sort | Sort[]) =>
        set((state) => {
          const currentSort = state.sorts[path]

          if (_.isEqual(currentSort, sort)) {
            return state
          }

          return {
            sorts: {
              ...state.sorts,
              [path]: sort,
            },
          }
        }),
    }),
    {
      name: 'pagination-storage',
    },
  ),
)

export default usePaginationStore
