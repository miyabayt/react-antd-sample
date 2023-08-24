import axios from 'axios'
import Cookie from 'js-cookie'

import { LoginUser } from '@/types'

const getLoginUser = async (): Promise<{
  data: LoginUser
  success: boolean
  message: string
}> => {
  const accessToken = Cookie.get('access_token')
  return axios
    .request({
      url: process.env.REACT_APP_API_BASE_URL + '/auth/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => data)
}

export default getLoginUser
