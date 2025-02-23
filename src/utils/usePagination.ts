import { DEFAULT_PAGE_SIZE } from '@/configs/app'
import usePaginationStore from '@/stores/usePaginationStore'
import type { PageInfo, Sort } from '@/types'
import type { SorterResult } from 'antd/es/table/interface'
import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router'

const usePagination = () => {
  const location = useLocation()
  const pathname = location.pathname

  const pages = usePaginationStore((state) => state.pages)
  const sorts = usePaginationStore((state) => state.sorts)
  const pagination = useMemo(
    () => pages[pathname] || { current: 0, pageSize: DEFAULT_PAGE_SIZE },
    [pathname, pages],
  )
  const sort = useMemo(() => sorts[pathname], [pathname, sorts])
  const setPagination = useCallback(
    (p: PageInfo) => usePaginationStore.getState().setPagination(pathname, p),
    [pathname],
  )
  const setSort = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: _
    (s: SorterResult<any> | SorterResult<any>[] | Sort) => {
      const state = usePaginationStore.getState()
      const sort = Array.isArray(s) ? s[0] : s

      if (!sort) {
        state.setSort(pathname, {})
        // biome-ignore lint/suspicious/noExplicitAny: _
      } else if ((sort as SorterResult<any>).order !== undefined) {
        // biome-ignore lint/suspicious/noExplicitAny: _
        const sorterResult = sort as SorterResult<any>
        state.setSort(pathname, {
          sortField:
            typeof sorterResult.field === 'string'
              ? String(sorterResult.field)
              : undefined,
          sortOrder:
            sorterResult.order === 'descend'
              ? 'desc'
              : sorterResult.order === 'ascend'
                ? 'asc'
                : undefined,
        })
      } else if ((sort as Sort).sortField !== undefined) {
        // TODO
      }
    },
    [pathname],
  )

  return {
    pagination,
    sort,
    setPagination,
    setSort,
  }
}

export default usePagination
