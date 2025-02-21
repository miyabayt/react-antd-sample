import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import UserForm from '@/features/users/UserForm'
import createUser from '@/services/users/createUser'
import type { User } from '@/types/user'
import { App, Card, Form } from 'antd'
import { useNavigate } from 'react-router'

const UserNewPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const { message } = App.useApp()

  const handleSubmit = async (user: User) => {
    try {
      setIsLoading(true)
      const created = await createUser({ user })
      navigate(`/user/users/show/${created.id}`)
      message.success('データ登録が成功しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginRequired>
      <Card title='顧客マスタ登録'>
        <UserForm
          form={form}
          onSave={handleSubmit}
          buttonText='登録'
          loading={isLoading}
        />
      </Card>
    </LoginRequired>
  )
}

export default UserNewPage
