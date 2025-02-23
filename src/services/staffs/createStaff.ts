import type { Staff } from '@/types/staff'
import fetcher from '@/utils/fetcher'

export type createStaffParams = {
  staff: Omit<Staff, 'id'>
}

const createStaff = async ({ staff }: createStaffParams): Promise<Staff> => {
  return await fetcher('/system/staff', {
    method: 'POST',
    data: staff,
  }).then(({ data }) => data?.data)
}

export default createStaff
