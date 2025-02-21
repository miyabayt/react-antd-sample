import axiosInstance from '@/utils/axios'
import type { AxiosRequestConfig } from 'axios'

const fetcher = async (
  url: string,
  config?: AxiosRequestConfig,
  // biome-ignore lint/suspicious/noExplicitAny: _
): Promise<any> => {
  return axiosInstance.request({ ...config, url })
}

export default fetcher
