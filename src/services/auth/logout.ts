import useAuthStore from '@/stores/useAuthStore'
import axiosInstance from '@/utils/axios'
import type { AxiosResponse } from 'axios'

const logout = async (): Promise<AxiosResponse> => {
  const { setAccessToken, resetLoginUser } = useAuthStore.getState()

  const clearAuth = (response: AxiosResponse) => {
    setAccessToken(null)
    resetLoginUser()
    return Promise.resolve(response)
  }

  return axiosInstance
    .request({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/auth/logout',
      method: 'POST',
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
