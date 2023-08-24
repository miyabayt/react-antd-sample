import { AxiosRequestConfig } from 'axios'
import { Staff } from '@/types/staff'
import fetcher from '@/utils/fetcher'

const deleteStaff = async (
  id: string,
  config?: AxiosRequestConfig,
): Promise<Staff> => {
  return await fetcher(`/system/staff/${id}`, {
    method: 'DELETE',
    ...config,
  }).then(({ data }) => data?.data)
}

export default deleteStaff
