import axios from 'axios'
import Cookie from 'js-cookie'

interface AccessToken {
  accessToken: string
  refreshToken: string
}

const login = async (
  username: string,
  password: string,
): Promise<{ data: AccessToken; success: boolean; message: string }> => {
  return axios
    .request({
      url: process.env.REACT_APP_API_BASE_URL + '/auth/login',
      method: 'POST',
      data: { username, password },
    })
    .then(({ data }) => {
      const { accessToken, refreshToken } = data?.data as AccessToken
      Cookie.set('access_token', accessToken)
      Cookie.set('refresh_token', refreshToken)
      return data
    })
}

export default login
