import AppButton from '@/components/atoms/AppButton'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  type FormInstance,
  type FormProps,
  Row,
  Space,
} from 'antd'
import type React from 'react'
import { useState } from 'react'

interface SearchFormProps {
  initialValues?: FormProps['initialValues']
  form: FormInstance
  name: string
  children: React.ReactNode
  expandable?: boolean // 詳細検索のトグル
  onFinish?: (values: FormData) => void
  onExpandChange?: (expanded: boolean) => void
  disabled?: boolean
}

const SearchForm = ({
  initialValues,
  form,
  name,
  children,
  expandable = false,
  onFinish,
  onExpandChange,
  disabled = false,
}: SearchFormProps) => {
  const [expanded, setExpanded] = useState(false)

  const formStyle = {
    padding: '16px 0',
  }

  return (
    <Form
      layout='horizontal'
      form={form}
      initialValues={initialValues}
      name={name}
      style={formStyle}
      onFinish={onFinish}
      disabled={disabled}
    >
      {children}
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space size='middle'>
            <AppButton
              type='secondary'
              style={{ minWidth: 100 }}
              onClick={() => {
                form.resetFields()
              }}
            >
              クリア
            </AppButton>
            <Button type='primary' htmlType='submit' style={{ minWidth: 100 }}>
              検索
            </Button>
            {expandable && (
              <Button
                type='link'
                style={{ fontSize: 12 }}
                onClick={() => {
                  setExpanded(!expanded)
                  if (onExpandChange) onExpandChange(expanded)
                }}
              >
                {expanded ? <UpOutlined /> : <DownOutlined />} 詳細検索
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
