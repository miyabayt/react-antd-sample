import refresh from '@/services/auth/refresh'
import useAuthStore from '@/stores/useAuthStore'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import _ from 'lodash'

const memoRefreshToken = _.memoize(refresh)

const createAxiosInstance = () => {
  const { accessToken, setAccessToken } = useAuthStore.getState()

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: Number.parseInt(process.env.REACT_APP_AXIOS_TIMEOUT || '3000'),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  instance.interceptors.request.use(async (config) => {
    if (accessToken === null) {
      const { data } = await memoRefreshToken()
      setAccessToken(data.accessToken)
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => {
      if (memoRefreshToken.cache.clear) {
        memoRefreshToken.cache.clear()
      }
      return response
    },
    async (error) => {
      if (error?.response?.status === 401) {
        const { data, success } = await memoRefreshToken()
        if (!success) {
          setAccessToken(null)
          return Promise.reject(error.response as AxiosResponse)
        }

        setAccessToken(data.accessToken)
        error.config.headers.Authorization = `Bearer ${accessToken}`
        return instance.request(error.config)
      }

      return Promise.reject(error.response as AxiosResponse)
    },
  )

  return instance
}

const axiosInstance: AxiosInstance = createAxiosInstance()
export default axiosInstance
