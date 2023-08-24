import { AxiosResponse } from 'axios'
import { saveAs } from 'file-saver'

import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchStaffParams {
  staffName?: string
  staffDate?: Date | string
}

const exportStaffCsv = (params?: SearchStaffParams) => {
  const query = { ...params }
  if (params?.staffDate) {
    query.staffDate = dayjs(params.staffDate).tz().format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  const filename = '担当者.csv'
  return fetcher(`/system/staffs/export/${filename}`, {
    method: 'POST',
    data: query,
  }).then((response: AxiosResponse) => {
    const blob = new Blob([response.data], { type: 'text/csv' })
    saveAs(blob, filename)
  })
}

export default exportStaffCsv
