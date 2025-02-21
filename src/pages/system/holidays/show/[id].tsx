import { EditOutlined } from '@ant-design/icons'
import { App, Button, Card, Descriptions, Modal, Row, Space } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import LoginRequired from '@/components/atoms/LoginRequired'
import deleteHoliday from '@/services/holidays/deleteHoliday'
import useHoliday from '@/services/holidays/useHoliday'

const HolidayDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const { isLoading, data: holiday } = useHoliday(id as string)
  const { message } = App.useApp()

  const handleOkClick = async () => {
    await deleteHoliday(id as string)
    navigate('/system/holidays')
    message.success('データ削除が成功しました。')
    return true
  }

  return (
    <LoginRequired>
      {!isLoading && holiday && (
        <Card
          title='祝日マスタ詳細'
          loading={isLoading}
          extra={
            <Button
              type='primary'
              icon={<EditOutlined />}
              ghost
              onClick={() => navigate(`/system/holidays/edit/${id}`)}
            >
              編集
            </Button>
          }
        >
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <Descriptions
              size='small'
              labelStyle={{ width: 200, fontWeight: 600 }}
              bordered
            >
              <Descriptions.Item label='ID' span={3}>
                {holiday.id}
              </Descriptions.Item>
              <Descriptions.Item label='名称' span={3}>
                {holiday.holidayName}
              </Descriptions.Item>
              <Descriptions.Item label='日付' span={3}>
                {holiday.holidayDate}
              </Descriptions.Item>
              <Descriptions.Item label='登録日時' span={3}>
                {holiday.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label='更新日時' span={3}>
                {holiday.updatedAt}
              </Descriptions.Item>
            </Descriptions>
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
        </Card>
      )}
    </LoginRequired>
  )
}

export default HolidayDetailPage
