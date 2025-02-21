import useAuthStore from '@/stores/useAuthStore'
import axios, { type AxiosResponse } from 'axios'

interface AccessToken {
  accessToken: string
}

interface LoginResponse {
  data: AccessToken
  success: boolean
  message: string
}

const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const { setAccessToken } = useAuthStore.getState()

  return axios
    .request({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/auth/login',
      method: 'POST',
      data: { username, password },
    })
    .then(({ data: { data } }: AxiosResponse<LoginResponse>) => {
      const { accessToken } = data
      setAccessToken(accessToken)
      return { data } as LoginResponse
    })
}

export default login
