import type { AxiosRequestConfig } from 'axios'

import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'

const useStaff = (id: string) => {
  return useApiResource(['staff', id], async (config?: AxiosRequestConfig) => {
    return await fetcher(`/system/staff/${id}`, {
      ...config,
      method: 'GET',
    }).then(({ data }) => data?.data)
  })
}

export default useStaff
