import dayjs from '@/utils/dayjs'
import type { ValueFormatterParams } from 'ag-grid-community'

export const yyyyMMdd_JP_dateValueFormatter = (
  params: ValueFormatterParams,
) => {
  return dayjs(params.value).tz().format('YYYY年MM月DD日')
}

export const yyyyMMdd_HHmm_dateValueFormatter = (
  params: ValueFormatterParams,
) => {
  return dayjs(params.value).tz().format('YYYY/MM/DD HH:mm')
}

export const yyyyMMdd_HHmmss_dateValueFormatter = (
  params: ValueFormatterParams,
) => {
  return dayjs(params.value).tz().format('YYYY/MM/DD HH:mm:ss')
}
