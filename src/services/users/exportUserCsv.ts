import type { AxiosResponse } from 'axios'
import { saveAs } from 'file-saver'

import { YYYYMMDDHHmmss } from '@/configs/app'
import dayjs from '@/utils/dayjs' // タイムゾーン設定済み
import fetcher from '@/utils/fetcher'

interface SearchUserParams {
  userName?: string
  userDate?: Date | string
}

const exportUserCsv = (params?: SearchUserParams) => {
  const query = { ...params }
  if (params?.userDate) {
    query.userDate = dayjs(params.userDate).tz().format('YYYY-MM-DDTHH:mm:ss') // UTC→ローカル時間
  }

  const filename = `顧客_${dayjs().format(YYYYMMDDHHmmss)}.csv`
  return fetcher('/user/users/export', {
    method: 'POST',
    data: query,
  }).then((response: AxiosResponse) => {
    const blob = new Blob([response.data], { type: 'text/csv' })
    saveAs(blob, filename)
  })
}

export default exportUserCsv
