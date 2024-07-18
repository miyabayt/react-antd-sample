import axios from 'axios'
import { setAccessToken } from '@/utils/axios'

interface AccessToken {
  accessToken: string
}

const login = async (
  username: string,
  password: string,
): Promise<{ data: AccessToken; success: boolean; message: string }> => {
  return axios
    .request({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/auth/login',
      method: 'POST',
      data: { username, password },
    })
    .then(({ data }) => {
      const { accessToken } = data?.data as AccessToken
      setAccessToken(accessToken)
      return data
    })
}

export default login
