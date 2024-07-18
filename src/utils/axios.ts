import axios, { AxiosInstance, AxiosResponse } from 'axios'

import _ from 'lodash'
import refresh from '@/services/auth/refresh'

let accessToken: string | null = null

export const setAccessToken = (token: string | null): void => {
  accessToken = token
}

export const getAccessToken = (): string | null => {
  return accessToken
}

const memoRefreshToken = _.memoize(refresh)

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: parseInt(process.env.REACT_APP_AXIOS_TIMEOUT || '3000'),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  instance.interceptors.request.use(async (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401 && accessToken) {
        await memoRefreshToken(accessToken)
        return instance.request(error.config)
      }
      return Promise.reject(error.response as AxiosResponse)
    },
  )

  return instance
}

const axiosInstance: AxiosInstance = createAxiosInstance()
export default axiosInstance
