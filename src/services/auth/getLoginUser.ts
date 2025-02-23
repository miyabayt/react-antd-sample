import type { LoginUser } from '@/types'
import axiosInstance from '@/utils/axios'

interface MeResponse {
  data: LoginUser
  success: boolean
  message: string
}

const getLoginUser = async (): Promise<MeResponse> => {
  return axiosInstance
    .request({
      url: '/auth/me',
      method: 'GET',
    })
    .then(({ data }) => data)
    .catch(
      (error) =>
        error?.response?.data || {
          data: null,
          success: false,
          message: 'unexpected error',
        },
    )
}

export default getLoginUser
