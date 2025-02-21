import { EditOutlined } from '@ant-design/icons'
import { App, Button, Card, Descriptions, Modal, Row, Space } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import LoginRequired from '@/components/atoms/LoginRequired'
import deleteUser from '@/services/users/deleteUser'
import useUser from '@/services/users/useUser'

const UserDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const { isLoading, data: user } = useUser(id as string)
  const { message } = App.useApp()

  const handleOkClick = async () => {
    await deleteUser(id as string)
    navigate('/user/users')
    message.success('データ削除が成功しました。')
    return true
  }

  return (
    <LoginRequired>
      <Card
        title='顧客マスタ詳細'
        loading={isLoading}
        extra={
          <Button
            type='primary'
            icon={<EditOutlined />}
            ghost
            onClick={() => navigate(`/user/users/edit/${id}`)}
          >
            編集
          </Button>
        }
      >
        {!isLoading && (
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <Descriptions
              size='small'
              labelStyle={{ width: 200, fontWeight: 600 }}
              bordered
            >
              <Descriptions.Item label='ID' span={3}>
                {user.id}
              </Descriptions.Item>
              <Descriptions.Item label='氏名' span={3}>
                {user.fullName}
              </Descriptions.Item>
              <Descriptions.Item label='メールアドレス' span={3}>
                {user.email}
              </Descriptions.Item>
              <Descriptions.Item label='電話番号' span={3}>
                {user.tel}
              </Descriptions.Item>
              <Descriptions.Item label='郵便番号' span={3}>
                {user.zip}
              </Descriptions.Item>
              <Descriptions.Item label='住所' span={3}>
                {user.address}
              </Descriptions.Item>
              <Descriptions.Item label='登録日時' span={3}>
                {user.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label='更新日時' span={3}>
                {user.updatedAt}
              </Descriptions.Item>
            </Descriptions>
            <Row justify='center'>
              <Space direction='horizontal' size='middle'>
                <Button
                  type='primary'
                  style={{ minWidth: 100 }}
                  onClick={() => navigate('/user/users')}
                  ghost
                >
                  戻る
                </Button>
                <Button
                  type='primary'
                  style={{ minWidth: 100 }}
                  onClick={() => setShowConfirm(true)}
                  danger
                >
                  削除
                </Button>
                <Modal
                  title='確認'
                  open={showConfirm}
                  onOk={handleOkClick}
                  onCancel={() => setShowConfirm(false)}
                  okText='削除'
                  cancelText='キャンセル'
                  okType='danger'
                  centered
                >
                  <p>データを削除します。よろしいですか？</p>
                </Modal>
              </Space>
            </Row>
          </Space>
        )}
      </Card>
    </LoginRequired>
  )
}

export default UserDetailPage
