import { App, Form } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import LoginRequired from '@/components/atoms/LoginRequired'
import AppCard from '@/components/molecules/AppCard'
import StaffForm from '@/features/staffs/StaffForm'
import updateStaff from '@/services/staffs/updateStaff'
import useStaff from '@/services/staffs/useStaff'
import type { Staff } from '@/types/staff'

const StaffEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isSaving, setIsSaving] = useState(false)
  const { isLoading, data: staff } = useStaff(id as string)
  const { message } = App.useApp()

  if (!isLoading && !isSaving && staff) {
    form.setFieldsValue({ ...staff })
  }

  const handleSubmit = async (values: Staff) => {
    try {
      setIsSaving(true)
      const updated = await updateStaff({ staff: { ...staff, ...values } })
      navigate(`/system/staffs/show/${updated.id}`)
      message.success('データ更新が成功しました。')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <LoginRequired>
      <AppCard title='担当者マスタ編集' loading={isLoading}>
        <StaffForm
          form={form}
          onSave={handleSubmit}
          buttonText='保存'
          loading={isSaving}
        />
      </AppCard>
    </LoginRequired>
  )
}

export default StaffEditPage
