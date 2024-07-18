import axios from 'axios'
import { setAccessToken } from '@/utils/axios'

interface AccessToken {
  accessToken: string
}

const refresh = async (
  accessToken: string,
): Promise<{
  data: AccessToken
  success: boolean
  message: string
}> => {
  return await axios
    .request({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: '/auth/refresh',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => {
      const { accessToken } = data?.data as AccessToken
      setAccessToken(accessToken)
      return data
    })
    .catch((e) => {
      setAccessToken(null)
      return Promise.reject(e)
    })
}

export default refresh
