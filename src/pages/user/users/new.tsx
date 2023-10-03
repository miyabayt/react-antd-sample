import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { App, Card, Form } from 'antd'
import LoginRequired from '@/components/atoms/LoginRequired'
import UserForm from '@/components/organisms/UserForm'
import createUser from '@/services/users/createUser'
import { User } from '@/types/user'

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
      <Card title='顧客マスタ登録' bordered>
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
