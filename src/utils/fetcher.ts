import { NavigateFunction } from 'react-router-dom'
import { AxiosRequestConfig } from 'axios'
import axiosInstance from '@/utils/axios'

let navigate: NavigateFunction

export const setNavigate = (navi: NavigateFunction) => {
  navigate = navi
}

const fetcher = async (
  url: string,
  config?: AxiosRequestConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  return axiosInstance.request({ ...config, url }).catch((e) => {
    if (e.response?.status === 401) {
      navigate('/login')
    }
    return Promise.reject(e)
  })
}

export default fetcher
