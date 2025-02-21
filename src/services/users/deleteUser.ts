import type { User } from '@/types/user'
import fetcher from '@/utils/fetcher'
import type { AxiosRequestConfig } from 'axios'

const deleteUser = async (
  id: string,
  config?: AxiosRequestConfig,
): Promise<User> => {
  return await fetcher(`/user/user/${id}`, {
    method: 'DELETE',
    ...config,
  }).then(({ data }) => data?.data)
}

export default deleteUser
