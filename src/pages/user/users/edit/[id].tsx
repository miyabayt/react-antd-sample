import { App, Card, Form } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import LoginRequired from '@/components/atoms/LoginRequired'
import UserForm from '@/components/organisms/UserForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import updateUser from '@/services/users/updateUser'
import useUser from '@/services/users/useUser'
import { User } from '@/types/user'
import dayjs from '@/utils/dayjs'

const UserEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isSaving, setIsSaving] = useState(false)
  const { isLoading, data: user } = useUser(id as string)
  const { message } = App.useApp()

  if (!isLoading && !isSaving && user) {
    form.setFieldsValue({ ...user, userDate: dayjs(user.userDate) })
  }

  const handleSubmit = async (values: User) => {
    try {
      setIsSaving(true)
      const updated = await updateUser({ user: { ...user, ...values } })
      navigate(`/user/users/show/${updated.id}`)
      message.success('データ更新が成功しました。')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card title='顧客マスタ編集' loading={isLoading} bordered>
          <UserForm
            form={form}
            onSave={handleSubmit}
            buttonText='保存'
            loading={isSaving}
          />
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default UserEditPage
