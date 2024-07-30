import axios, { AxiosResponse } from 'axios'
import { setAccessToken } from '@/utils/axios'

interface AccessToken {
  accessToken: string
}

interface RefreshResponse {
  data: AccessToken
  success: boolean
  message: string
}

const refresh = (accessToken: string): Promise<RefreshResponse> => {
  return axios
    .request({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/auth/refresh',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    .then(({ data }: AxiosResponse<{ data: AccessToken }>) => {
      const { accessToken } = data.data
      setAccessToken(accessToken)
      return data as RefreshResponse
    })
    .catch((error) => {
      setAccessToken(null)
      return Promise.reject(error)
    })
}

export default refresh
