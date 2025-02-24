import { EditOutlined } from '@ant-design/icons'
import { App, Descriptions, Flex, Modal, Row, Space } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import AppButton from '@/components/atoms/AppButton'
import LoginRequired from '@/components/atoms/LoginRequired'
import AppCard from '@/components/molecules/AppCard'
import AppDescriptions from '@/components/molecules/AppDescriptions'
import { YYYY_MM_DD_HH_mm_ss, YYYY_MM_DD_JP } from '@/configs/app'
import deleteHoliday from '@/services/holidays/deleteHoliday'
import useHoliday from '@/services/holidays/useHoliday'
import dayjs from '@/utils/dayjs'

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
        <AppCard
          title='祝日マスタ詳細'
          loading={isLoading}
          extra={
            <AppButton
              type='secondary'
              icon={<EditOutlined />}
              onClick={() => navigate(`/system/holidays/edit/${id}`)}
              narrow
            >
              編集
            </AppButton>
          }
        >
          <Flex gap={16} vertical>
            <AppDescriptions>
              <Descriptions.Item label='ID' span={3}>
                {holiday.id}
              </Descriptions.Item>
              <Descriptions.Item label='名称' span={3}>
                {holiday.holidayName}
              </Descriptions.Item>
              <Descriptions.Item label='日付' span={3}>
                {dayjs(holiday.holidayDate).format(YYYY_MM_DD_JP)}
              </Descriptions.Item>
              <Descriptions.Item label='登録日時' span={3}>
                {dayjs(holiday.createdAt).format(YYYY_MM_DD_HH_mm_ss)}
              </Descriptions.Item>
              <Descriptions.Item label='更新日時' span={3}>
                {dayjs(holiday.updatedAt).format(YYYY_MM_DD_HH_mm_ss)}
              </Descriptions.Item>
            </AppDescriptions>
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
                  type='danger'
                  style={{ minWidth: 100 }}
                  onClick={() => setShowConfirm(true)}
                >
                  削除
                </AppButton>
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
          </Flex>
        </AppCard>
      )}
    </LoginRequired>
  )
}

export default HolidayDetailPage
