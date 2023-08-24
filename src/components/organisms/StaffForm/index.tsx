import { Button, Col, Form, FormInstance, Input, Row, Space } from 'antd'

import { useNavigate } from 'react-router-dom'
import { Staff } from '@/types/staff'

interface StaffFormProps {
  form: FormInstance
  onSave: (values: Staff) => void
  loading: boolean
  buttonText: string
}

const StaffForm = ({ form, onSave, loading, buttonText }: StaffFormProps) => {
  const navigate = useNavigate()

  return (
    <Form form={form} onFinish={onSave} layout='vertical'>
      <Row gutter={24}>
        <Col>
          <Form.Item name='lastName' label='姓' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='firstName' label='名' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item
          name='password'
          label='パスワード'
          style={{ minWidth: 380 }}
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name='passwordConfirm'
          label='確認用パスワード'
          style={{ minWidth: 380 }}
          rules={[
            { required: true },
            {
              validator(rule, value, callback) {
                if (value && value !== form.getFieldValue('password')) {
                  callback('確認用パスワードが間違っています。')
                } else {
                  callback()
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name='email'
          label='メールアドレス'
          style={{ minWidth: 380 }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item name='tel' label='電話番号'>
          <Input />
        </Form.Item>
      </Row>
      <Row justify='center'>
        <Space direction='horizontal' size='middle'>
          <Button
            type='primary'
            style={{ minWidth: 100 }}
            onClick={() => navigate('/system/staffs')}
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

export default StaffForm
