import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Cookie from 'js-cookie'

import refresh from '@/services/auth/refresh'
import { isTokenExpired } from '@/utils/jwt'

let isRefreshing = false

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: parseInt(process.env.REACT_APP_AXIOS_TIMEOUT || '3000'),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(async (config) => {
    const accessToken = Cookie.get('access_token')
    const refreshToken = Cookie.get('refresh_token')
    let newAccessToken = accessToken
    if (
      !isRefreshing &&
      accessToken &&
      refreshToken &&
      isTokenExpired(accessToken)
    ) {
      try {
        isRefreshing = true
        console.log('try to refresh token...')
        const { data, success } = await refresh(accessToken, refreshToken)
        if (success) {
          console.log('access token has been refreshed!')
          newAccessToken = data.accessToken
        }
      } catch (e) {
        console.log('failed to refresh token.')
      } finally {
        isRefreshing = false
      }
    }

    config.headers.Authorization = `Bearer ${newAccessToken}`

    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error.response as AxiosResponse)
    },
  )

  return instance
}

const axiosInstance: AxiosInstance = createAxiosInstance()
export default axiosInstance
