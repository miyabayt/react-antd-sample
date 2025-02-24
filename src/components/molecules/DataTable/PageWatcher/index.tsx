import { DEFAULT_PAGE_SIZE, PAGE_SIZE_LIST } from '@/configs/app'
import usePaginationStore from '@/stores/usePaginationStore'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { useShallow } from 'zustand/shallow'

const PageWatcher = () => {
  const location = useLocation()
  const prevPathname = useRef(location.pathname)
  const { pages, setPagination } = usePaginationStore(
    useShallow((state) => state),
  )

  useEffect(() => {
    const prev = prevPathname.current
    if (
      pages[prev]?.pageSize &&
      pages[prev].pageSize > Math.max(...PAGE_SIZE_LIST)
    ) {
      setPagination(prev, {
        current: 0,
        pageSize: DEFAULT_PAGE_SIZE,
      })
    }

    prevPathname.current = location.pathname
  }, [location.pathname])

  return null
}

export default PageWatcher
