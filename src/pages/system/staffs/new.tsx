import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { App, Card, Form } from 'antd'

import LoginRequired from '@/components/atoms/LoginRequired'
import StaffForm from '@/components/organisms/StaffForm'
import createStaff from '@/services/staffs/createStaff'
import { Staff } from '@/types'

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
      <Card title='担当者マスタ登録' bordered>
        <StaffForm
          form={form}
          onSave={handleSubmit}
          buttonText='登録'
          loading={isLoading}
        />
      </Card>
    </LoginRequired>
  )
}

export default StaffNewPage
