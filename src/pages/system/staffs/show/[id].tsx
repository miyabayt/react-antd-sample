import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import { App, Button, Card, Descriptions, Modal, Row, Space } from 'antd'

import LoginRequired from '@/components/atoms/LoginRequired'
import deleteStaff from '@/services/staffs/deleteStaff'
import useStaff from '@/services/staffs/useStaff'

const StaffDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const { isLoading, data: staff } = useStaff(id as string)
  const { message } = App.useApp()

  const handleOkClick = async () => {
    await deleteStaff(id as string)
    navigate('/system/staffs')
    message.success('データ削除が成功しました。')
    return true
  }

  return (
    <LoginRequired>
      <Card
        title='担当者マスタ詳細'
        loading={isLoading}
        bordered
        extra={
          <Button
            type='primary'
            icon={<EditOutlined />}
            ghost
            onClick={() => navigate(`/system/staffs/edit/${id}`)}
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
                {staff.id}
              </Descriptions.Item>
              <Descriptions.Item label='氏名' span={3}>
                {staff.fullName}
              </Descriptions.Item>
              <Descriptions.Item label='メールアドレス' span={3}>
                {staff.email}
              </Descriptions.Item>
              <Descriptions.Item label='電話番号' span={3}>
                {staff.tel}
              </Descriptions.Item>
              <Descriptions.Item label='登録日時' span={3}>
                {staff.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label='更新日時' span={3}>
                {staff.updatedAt}
              </Descriptions.Item>
            </Descriptions>
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

export default StaffDetailPage
