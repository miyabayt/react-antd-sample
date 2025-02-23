import { fakerJA as faker } from '@faker-js/faker'
import holidayJp from '@holiday-jp/holiday_jp'
import { formatDate } from '../utils.js'

const FROM_DATE = '2000-01-01'
const TO_DATE = '2025-01-01'
const holidays = holidayJp.between(new Date(FROM_DATE), new Date(TO_DATE))

export const createHoliday = (index) => {
  const createdAt = faker.date.between({
    from: FROM_DATE,
    to: TO_DATE,
  })

  return {
    id: index + 1,
    holidayName: holidays[index].name,
    holidayDate: formatDate(holidays[index].date),
    createdAt: formatDate(createdAt),
    updatedAt: formatDate(
      faker.date.between({
        from: createdAt,
        to: '2025-01-01',
      }),
    ),
    version: 1,
  }
}
