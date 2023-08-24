import usePaginationStore from '@/stores/usePaginationStore'

const usePagination = (key: string) => {
  const { pages, sorts, setPagination, setSort } = usePaginationStore(
    (state) => state,
  )
  const pagination = pages[key] || { current: 1, pageSize: 20 }
  const sort = sorts[key]

  return {
    pagination,
    sort,
    setPagination,
    setSort,
  }
}

export default usePagination
