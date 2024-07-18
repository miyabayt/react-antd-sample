import { AxiosResponse } from 'axios'

import useAuthStore from '@/stores/useAuthStore'
import axiosInstance, { getAccessToken } from '@/utils/axios'

const logout = async (): Promise<AxiosResponse> => {
  const accessToken = getAccessToken()
  const { resetLoginUser } = useAuthStore.getState()
  const clearAuth = (response: AxiosResponse) => {
    resetLoginUser()
    return Promise.resolve(response)
  }

  return axiosInstance
    .request({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/auth/logout',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return clearAuth(response)
    })
    .catch((response) => {
      if (response.status < 500) {
        return clearAuth(response)
      }
      return Promise.reject(response)
    })
}

export default logout
