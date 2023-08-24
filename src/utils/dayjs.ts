import 'dayjs/locale/ja'
import dayjs, { locale, extend } from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

locale('ja')
extend(relativeTime)
extend(utc)
extend(timezone)
extend(isLeapYear)

dayjs.tz.setDefault('Asia/Tokyo')

export default dayjs
