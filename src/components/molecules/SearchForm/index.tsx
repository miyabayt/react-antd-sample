import React, { useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Col, Form, FormInstance, Row, Space } from 'antd'

interface SearchFormProps {
  form: FormInstance
  name: string
  children: React.ReactNode
  expandable?: boolean // 詳細検索のトグル
  onFinish?: (values: FormData) => void
  onExpandChange?: (expanded: boolean) => void
}

const SearchForm = ({
  form,
  name,
  children,
  expandable = false,
  onFinish,
  onExpandChange,
}: SearchFormProps) => {
  // const { token } = theme.useToken()
  const [expanded, setExpanded] = useState(false)

  const formStyle = {
    padding: '16px 0',
  }

  return (
    <Form
      layout='horizontal'
      form={form}
      name={name}
      style={formStyle}
      onFinish={onFinish}
    >
      {children}
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space size='middle'>
            <Button
              style={{ minWidth: 100 }}
              onClick={() => {
                form.resetFields()
              }}
            >
              クリア
            </Button>
            <Button type='primary' htmlType='submit' style={{ minWidth: 100 }}>
              検索
            </Button>
            {expandable && (
              <a
                style={{ fontSize: 12 }}
                onClick={() => {
                  setExpanded(!expanded)
                  if (onExpandChange) onExpandChange(expanded)
                }}
              >
                {expanded ? <UpOutlined /> : <DownOutlined />} 詳細検索
              </a>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
