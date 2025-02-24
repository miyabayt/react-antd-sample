import { App, Form } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import LoginRequired from '@/components/atoms/LoginRequired'
import AppCard from '@/components/molecules/AppCard'
import StaffForm from '@/features/staffs/StaffForm'
import createStaff from '@/services/staffs/createStaff'
import type { Staff } from '@/types'

const StaffNewPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const { message } = App.useApp()

  const handleSubmit = async (staff: Staff) => {
    try {
      setIsLoading(true)
      const created = await createStaff({ staff })
      navigate(`/system/staffs/show/${created.id}`)
      message.success('データ登録が成功しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginRequired>
      <AppCard title='担当者マスタ登録'>
        <StaffForm
          form={form}
          onSave={handleSubmit}
          buttonText='登録'
          loading={isLoading}
        />
      </AppCard>
    </LoginRequired>
  )
}

export default StaffNewPage
