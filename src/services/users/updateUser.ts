import type { User } from '@/types/user'
import fetcher from '@/utils/fetcher'

export type updateUserParams = {
  user: User
}

const updateUser = async ({ user }: updateUserParams): Promise<User> => {
  return await fetcher(`/user/user/${user.id}`, {
    method: 'PUT',
    data: user,
  }).then(({ data }) => data?.data)
}

export default updateUser
