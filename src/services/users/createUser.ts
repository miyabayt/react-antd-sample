import { User } from '@/types/user'
import fetcher from '@/utils/fetcher'

export type createUserParams = {
  user: Omit<User, 'id'>
}

const createUser = async ({ user }: createUserParams): Promise<User> => {
  return await fetcher(`/user/user`, {
    method: 'POST',
    data: user,
  }).then(({ data }) => data?.data)
}

export default createUser
