import { App, Card, Form } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginRequired from '@/components/atoms/LoginRequired'
import HolidayForm from '@/components/organisms/HolidayForm'
import createHoliday from '@/services/holidays/createHoliday'
import { Holiday } from '@/types/holiday'

const HolidayNewPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const { message } = App.useApp()

  const handleSubmit = async (holiday: Holiday) => {
    try {
      setIsLoading(true)
      const created = await createHoliday({ holiday })
      navigate(`/system/holidays/show/${created.id}`)
      message.success('データ登録が成功しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginRequired>
      <Card title='祝日マスタ登録' bordered>
        <HolidayForm
          form={form}
          onSave={handleSubmit}
          buttonText='登録'
          loading={isLoading}
        />
      </Card>
    </LoginRequired>
  )
}

export default HolidayNewPage
