import { css } from '@emotion/react'
import { Form, Input, Row, Button } from 'antd'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import getLoginUser from '@/services/auth/getLoginUser'
import login from '@/services/auth/login'
import useAuthStore from '@/stores/useAuthStore'

interface LoginForm {
  username: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { redirectTo, setLoginUser, setRedirectTo } = useAuthStore(
    (state) => state,
  )
  const [form] = Form.useForm<LoginForm>()

  const handleSubmit = async (values: LoginForm) => {
    try {
      setIsLoading(true)
      await login(values.username, values.password)
      const { data: loginUser, success } = await getLoginUser()

      if (success) {
        setLoginUser(loginUser)

        if (redirectTo) {
          console.log('redirect to: ', redirectTo)
          navigate(redirectTo)
        } else {
          navigate('/')
        }
      }

      // TODO toast?
    } finally {
      setRedirectTo(undefined)
      setIsLoading(false)
    }
  }

  return (
    <>
      <div css={styles.form}>
        <div css={styles.logo}>
          <strong>Sample Admin</strong>
        </div>
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Form.Item
            label='ログインID'
            required
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.Item
            label='パスワード'
            required
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input type='password' size='large' />
          </Form.Item>
          <Row style={{ marginTop: '48px' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={isLoading}
              block={true}
              size='large'
            >
              ログイン
            </Button>
          </Row>
        </Form>
      </div>
    </>
  )
}

const styles = {
  form: css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -220px 0 0 -220px;
    width: 440px;
    height: 400px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    border: 1px solid #d0d7de;
    border-radius: 4px;
  `,

  logo: css`
    font-size: 1.6em;
    text-align: center;
    cursor: pointer;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}

export default LoginPage
