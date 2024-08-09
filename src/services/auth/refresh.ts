import axios, { AxiosResponse } from 'axios'

interface AccessToken {
  accessToken: string
}

interface RefreshResponse {
  data: AccessToken
  success: boolean
  message: string
}

const refresh = (): Promise<RefreshResponse> => {
  return axios
    .request({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/auth/refresh',
      method: 'POST',
      withCredentials: true,
    })
    .then(({ data }: AxiosResponse<{ data: AccessToken }>) => {
      return data as RefreshResponse
    })
    .catch((e) => {
      return e.response?.data as RefreshResponse
    })
}

export default refresh
