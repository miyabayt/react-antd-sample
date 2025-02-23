import type { Holiday } from '@/types/holiday'
import fetcher from '@/utils/fetcher'
import type { AxiosRequestConfig } from 'axios'

const deleteHoliday = async (
  id: string,
  config?: AxiosRequestConfig,
): Promise<Holiday> => {
  return await fetcher(`/system/holiday/${id}`, {
    method: 'DELETE',
    ...config,
  }).then(({ data }) => data?.data)
}

export default deleteHoliday
