import axios from 'axios'
import Cookie from 'js-cookie'

interface AccessToken {
  accessToken: string
  refreshToken: string
}

const refresh = async (
  accessToken: string,
  refreshToken: string,
): Promise<{ data: AccessToken; success: boolean; message: string }> => {
  return await axios
    .request({
      url: process.env.REACT_APP_API_BASE_URL + '/auth/refresh',
      method: 'POST',
      data: { accessToken, refreshToken },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => {
      const { accessToken, refreshToken } = data?.data as AccessToken
      Cookie.set('access_token', accessToken)
      Cookie.set('refresh_token', refreshToken)
      return data
    })
    .catch((e) => {
      Cookie.remove('access_token')
      Cookie.remove('refresh_token')
      return Promise.reject(e)
    })
}

export default refresh
