import type { AxiosRequestConfig } from 'axios'

import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'

const useHoliday = (id: string) => {
  return useApiResource(
    ['holiday', id],
    async (config?: AxiosRequestConfig) => {
      return await fetcher(`/system/holiday/${id}`, {
        ...config,
        method: 'GET',
      }).then(({ data }) => data?.data)
    },
  )
}

export default useHoliday
