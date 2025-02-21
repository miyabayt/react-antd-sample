import type { AxiosRequestConfig } from 'axios'

import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'

interface SearchHolidayParams {
  holidayName?: string
  holidayDate?: Date | string
  current?: number
  pageSize?: number
}

const useHolidaySearch = (params?: SearchHolidayParams) => {
  const query = { ...params }
  if (params?.holidayDate) {
    query.holidayDate = dayjs(params.holidayDate)
      .tz()
      .format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  return useApiResource(
    ['holidays', query],
    async (config?: AxiosRequestConfig) => {
      const page = (query.current || 1) - 1
      const pageSize = query.pageSize || 20
      return fetcher(`/system/holiday/search?page=${page}&size=${pageSize}`, {
        ...config,
        method: 'POST',
        data: query,
      }).then(({ data }) => data)
    },
    {
      staleTime: 1000,
    },
  )
}

export default useHolidaySearch
