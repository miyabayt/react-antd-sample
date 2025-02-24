import { EditOutlined } from '@ant-design/icons'
import { App, Descriptions, Modal, Row, Space } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import AppButton from '@/components/atoms/AppButton'
import LoginRequired from '@/components/atoms/LoginRequired'
import AppCard from '@/components/molecules/AppCard'
import AppDescriptions from '@/components/molecules/AppDescriptions'
import { YYYY_MM_DD_HH_mm_ss } from '@/configs/app'
import deleteStaff from '@/services/staffs/deleteStaff'
import useStaff from '@/services/staffs/useStaff'
import dayjs from '@/utils/dayjs'

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
      {!isLoading && staff && (
        <AppCard
          title='担当者マスタ詳細'
          loading={isLoading}
          extra={
            <AppButton
              type='secondary'
              icon={<EditOutlined />}
              onClick={() => navigate(`/system/staffs/edit/${id}`)}
              narrow
            >
              編集
            </AppButton>
          }
        >
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <AppDescriptions>
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
                {dayjs(staff.createdAt).format(YYYY_MM_DD_HH_mm_ss)}
              </Descriptions.Item>
              <Descriptions.Item label='更新日時' span={3}>
                {dayjs(staff.updatedAt).format(YYYY_MM_DD_HH_mm_ss)}
              </Descriptions.Item>
            </AppDescriptions>
            <Row justify='center'>
              <Space direction='horizontal' size='middle'>
                <AppButton
                  type='secondary'
                  style={{ minWidth: 100 }}
                  onClick={() => navigate('/system/staffs')}
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
          </Space>
        </AppCard>
      )}
    </LoginRequired>
  )
}

export default StaffDetailPage
