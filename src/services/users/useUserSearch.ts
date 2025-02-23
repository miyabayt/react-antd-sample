import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'
import type { AxiosRequestConfig } from 'axios'

interface SearchUserParams {
  fullName?: string | undefined
  current?: number
  pageSize?: number
}

const useUserResource = (params: SearchUserParams) => {
  const query = { ...params }
  return useApiResource(
    ['users', query],
    async (config?: AxiosRequestConfig) => {
      const page = (query.current || 1) - 1
      const pageSize = query.pageSize || 20
      return fetcher(`/user/users/search?page=${page}&size=${pageSize}`, {
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

export default useUserResource
