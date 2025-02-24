import { css } from '@emotion/react'
import { Form, Input, Row } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import AppButton from '@/components/atoms/AppButton'
import AppForm from '@/components/molecules/AppForm'
import AppFormItem from '@/components/molecules/AppFormItem'
import getLoginUser from '@/services/auth/getLoginUser'
import login from '@/services/auth/login'
import useAuthStore from '@/stores/useAuthStore'
import { useShallow } from 'zustand/shallow'

interface LoginForm {
  username: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { redirectTo, setLoginUser, setRedirectTo } = useAuthStore(
    useShallow((state) => state),
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

      // TODO toast
    } finally {
      setRedirectTo(null)
      setIsLoading(false)
    }
  }

  return (
    <>
      <div css={styles.form}>
        <div css={styles.logo}>
          <strong>Sample Admin</strong>
        </div>
        <AppForm form={form} onFinish={handleSubmit} layout='vertical'>
          <AppFormItem label='ログインID' name='username' required>
            <Input size='large' />
          </AppFormItem>
          <AppFormItem label='パスワード' name='password' required>
            <Input type='password' size='large' />
          </AppFormItem>
          <Row style={{ marginTop: '48px' }}>
            <AppButton
              type='primary'
              htmlType='submit'
              loading={isLoading}
              block={true}
              size='large'
            >
              ログイン
            </AppButton>
          </Row>
        </AppForm>
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
