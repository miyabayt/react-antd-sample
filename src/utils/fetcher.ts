import { AxiosRequestConfig } from 'axios'

import axiosInstance from '@/utils/axios'

const fetcher = async (
  url: string,
  config?: AxiosRequestConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  return axiosInstance.request({ ...config, url })
}

export default fetcher
