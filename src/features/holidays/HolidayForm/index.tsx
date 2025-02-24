import AppButton from '@/components/atoms/AppButton'
import AppDatePicker from '@/components/atoms/AppDatePicker'
import AppForm from '@/components/molecules/AppForm'
import AppFormItem from '@/components/molecules/AppFormItem'
import type { Holiday } from '@/types/holiday'
import { type FormInstance, Input, Row, Space } from 'antd'
import { useNavigate } from 'react-router'

interface HolidayFormProps {
  form: FormInstance
  onSave: (values: Holiday) => void
  loading: boolean
  buttonText: string
}

const HolidayForm = ({
  form,
  onSave,
  loading,
  buttonText,
}: HolidayFormProps) => {
  const navigate = useNavigate()

  return (
    <AppForm form={form} onFinish={onSave} layout='vertical'>
      <Row>
        <AppFormItem name='holidayName' label='名称' required>
          <Input />
        </AppFormItem>
      </Row>
      <Row>
        <AppFormItem name='holidayDate' label='日付' required>
          <AppDatePicker style={{ minWidth: 180 }} />
        </AppFormItem>
      </Row>
      <Row justify='center'>
        <Space direction='horizontal' size='middle'>
          <AppButton
            type='secondary'
            style={{ minWidth: 100 }}
            onClick={() => navigate('/system/holidays')}
          >
            戻る
          </AppButton>
          <AppButton
            type='primary'
            htmlType='submit'
            style={{ minWidth: 100 }}
            loading={loading}
          >
            {buttonText}
          </AppButton>
        </Space>
      </Row>
    </AppForm>
  )
}

export default HolidayForm
