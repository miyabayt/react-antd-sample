import type { AxiosResponse } from 'axios'
import { saveAs } from 'file-saver'

import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchHolidayParams {
  holidayName?: string
  holidayDate?: Date | string
}

const exportHolidayCsv = (params?: SearchHolidayParams) => {
  const query = { ...params }
  if (params?.holidayDate) {
    query.holidayDate = dayjs(params.holidayDate)
      .tz()
      .format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  const filename = '祝日.csv'
  return fetcher(`/system/holidays/export/${filename}`, {
    method: 'POST',
    data: query,
  }).then((response: AxiosResponse) => {
    const blob = new Blob([response.data], { type: 'text/csv' })
    saveAs(blob, filename)
  })
}

export default exportHolidayCsv
