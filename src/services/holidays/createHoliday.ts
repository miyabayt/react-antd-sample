import { Holiday } from '@/types/holiday'
import fetcher from '@/utils/fetcher'

export type createHolidayParams = {
  holiday: Omit<Holiday, 'id'>
}

const createHoliday = async ({
  holiday,
}: createHolidayParams): Promise<Holiday> => {
  return await fetcher(`/system/holiday`, {
    method: 'POST',
    data: holiday,
  }).then(({ data }) => data?.data)
}

export default createHoliday
