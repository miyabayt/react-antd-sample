import type { Holiday } from '@/types/holiday'
import fetcher from '@/utils/fetcher'

export type updateHolidayParams = {
  holiday: Holiday
}

const updateHoliday = async ({
  holiday,
}: updateHolidayParams): Promise<Holiday> => {
  return await fetcher(`/system/holiday/${holiday.id}`, {
    method: 'PUT',
    data: holiday,
  }).then(({ data }) => data?.data)
}

export default updateHoliday
