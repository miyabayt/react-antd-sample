import { fakerJA as faker } from '@faker-js/faker'
import { formatDate } from '../utils.js'

export const createUser = (index) => {
  const createdAt = faker.date.between({
    from: '2020-01-01',
    to: '2024-01-01',
  })

  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    id: index + 1,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email(),
    tel: faker.phone.number(),
    createdAt: formatDate(createdAt),
    updatedAt: formatDate(
      faker.date.between({
        from: createdAt,
        to: '2024-01-01',
      }),
    ),
    version: 1,
  }
}
