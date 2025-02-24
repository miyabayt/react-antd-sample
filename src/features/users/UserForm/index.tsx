import { Button, Col, type FormInstance, Input, Row, Space } from 'antd'
import { useNavigate } from 'react-router'

import AppButton from '@/components/atoms/AppButton'
import AppForm from '@/components/molecules/AppForm'
import AppFormItem from '@/components/molecules/AppFormItem'
import type { User } from '@/types/user'

interface UserFormProps {
  form: FormInstance
  onSave: (values: User) => void
  loading: boolean
  buttonText: string
}

const UserForm = ({ form, onSave, loading, buttonText }: UserFormProps) => {
  const navigate = useNavigate()

  return (
    <AppForm form={form} onFinish={onSave} layout='vertical'>
      <Row gutter={24}>
        <Col>
          <AppFormItem name='lastName' label='姓' required>
            <Input />
          </AppFormItem>
        </Col>
        <Col>
          <AppFormItem name='firstName' label='名' required>
            <Input />
          </AppFormItem>
        </Col>
      </Row>
      <Row>
        <AppFormItem
          name='password'
          label='パスワード'
          style={{ minWidth: 380 }}
          required
        >
          <Input.Password />
        </AppFormItem>
      </Row>
      <Row>
        <AppFormItem
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
        </AppFormItem>
      </Row>
      <Row>
        <AppFormItem
          name='email'
          label='メールアドレス'
          required
          style={{ minWidth: 380 }}
        >
          <Input />
        </AppFormItem>
      </Row>
      <Row>
        <AppFormItem name='tel' label='電話番号'>
          <Input />
        </AppFormItem>
      </Row>
      <Row>
        <AppFormItem name='zip' label='郵便番号'>
          <Input />
        </AppFormItem>
      </Row>
      <Row>
        <AppFormItem name='address' label='住所'>
          <Input style={{ minWidth: 380 }} />
        </AppFormItem>
      </Row>
      <Row justify='center'>
        <Space direction='horizontal' size='middle'>
          <AppButton
            type='secondary'
            style={{ minWidth: 100 }}
            onClick={() => navigate('/user/users')}
          >
            戻る
          </AppButton>
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
    </AppForm>
  )
}

export default UserForm
