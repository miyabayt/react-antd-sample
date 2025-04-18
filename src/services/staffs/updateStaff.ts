import type { Staff } from '@/types/staff'
import fetcher from '@/utils/fetcher'

export type updateStaffParams = {
  staff: Staff
}

const updateStaff = async ({ staff }: updateStaffParams): Promise<Staff> => {
  return await fetcher(`/system/staff/${staff.id}`, {
    method: 'PUT',
    data: staff,
  }).then(({ data }) => data?.data)
}

export default updateStaff
