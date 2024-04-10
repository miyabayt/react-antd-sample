import { LoginUser } from '@/types'
import axiosInstance from '@/utils/axios'

const getLoginUser = async (): Promise<{
  data: LoginUser
  success: boolean
  message: string
}> => {
  return axiosInstance
    .request({
      url: '/auth/me',
      method: 'GET',
    })
    .then(({ data }) => data)
}

export default getLoginUser
