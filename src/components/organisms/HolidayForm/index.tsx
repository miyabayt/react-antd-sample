import { LeftSquareOutlined, SaveOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Space,
} from 'antd'

import { useNavigate } from 'react-router-dom'
import { Holiday } from '@/types/holiday'

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
    <Form form={form} onFinish={onSave} layout='vertical'>
      <Row>
        <Form.Item name='holidayName' label='名称' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item name='holidayDate' label='日付' rules={[{ required: true }]}>
          <DatePicker style={{ minWidth: 180 }} />
        </Form.Item>
      </Row>
      <Row justify='center'>
        <Space direction='horizontal' size='middle'>
          <Button
            type='primary'
            style={{ minWidth: 100 }}
            onClick={() => navigate('/system/holidays')}
            ghost
          >
            戻る
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            style={{ minWidth: 100 }}
            loading={loading}
          >
            {buttonText}
          </Button>
        </Space>
      </Row>
    </Form>
  )
}

export default HolidayForm
