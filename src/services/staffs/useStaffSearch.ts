import type { AxiosRequestConfig } from 'axios'

import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'

interface SearchStaffParams {
  fullName?: string
  current?: number
  pageSize?: number
}

const useStaffSearch = (params?: SearchStaffParams) => {
  const query = { ...params }
  return useApiResource(
    ['staffs', query],
    async (config?: AxiosRequestConfig) => {
      const page = (query.current || 1) - 1
      const pageSize = query.pageSize || 20
      return fetcher(`/staff/search?page=${page}&size=${pageSize}`, {
        ...config,
        method: 'POST',
        data: query,
      }).then(({ data }) => data)
    },
    {
      staleTime: 1000,
    },
  )
}

export default useStaffSearch
