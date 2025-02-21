import { fakerJA as faker } from '@faker-js/faker'
import { formatDate } from '../utils.js'

export const createUser = (index) => {
  const createdAt = faker.date.between({
    from: '2020-01-01',
    to: '2024-01-01',
  })

  return {
    id: index + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
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
