import dayjs, { type Dayjs, extend, locale } from 'dayjs'
import 'dayjs/locale/ja'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

locale('ja')
extend(relativeTime)
extend(utc)
extend(timezone)
extend(isLeapYear)
extend(customParseFormat)
extend(localeData)

dayjs.tz.setDefault('Asia/Tokyo')

export default dayjs

export const toDayjs = (dates: string[]): Dayjs[] => {
  return dates.map((date) => dayjs(date))
}
