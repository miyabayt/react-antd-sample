import { DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd'

import { useState } from 'react'

import { useNavigate, useLocation, Link } from 'react-router-dom'
import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'

import usePagination from '@/services/usePagination'
import exportUserCsv from '@/services/users/exportUserCsv'
import useUserSearch from '@/services/users/useUserSearch'
import { User } from '@/types/user'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { SorterResult } from 'antd/es/table/interface'

const UserSearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState({})
  const [expanded, setExpanded] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { pagination, sort, setPagination, setSort } = usePagination(
    location.pathname,
  )
  const { isLoading, data } = useUserSearch({
    ...query,
    ...pagination,
  })
  const [form] = Form.useForm()

  const onExpandChange = (expanded: boolean) => {
    setExpanded(!expanded)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const handleSearch = (values: FormData) => {
    const pagination = { current: 1 } // 1ページ目に戻す
    setPagination(location.pathname, pagination)
    setQuery({ ...values, ...pagination })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<User>,
  ) => {
    setPagination(location.pathname, pagination)
    //setSort(router.pathname, {...sorter})
    setQuery({
      ...query,
      ...pagination,
    })
  }

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      render: (_, record) => (
        <Link to={`/user/users/show/${record.id}`}>{record.id}</Link>
      ),
    },
    {
      title: '氏名',
      dataIndex: 'fullName',
      render: (_text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
    },
    {
      title: '電話番号',
      dataIndex: 'tel',
    },
    {
      title: 'アクション',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => {
              navigate(`/user/users/edit/${record.id}`)
            }}
          />
        </Space>
      ),
      align: 'center',
      width: 100,
    },
  ]

  const handleCsvExport = () => {
    exportUserCsv(query)
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card
          title='顧客マスタ検索'
          extra={
            <Button
              type='primary'
              icon={<PlusOutlined />}
              style={{ minWidth: 100 }}
              onClick={() => {
                navigate('/user/users/new')
              }}
              ghost
            >
              新規登録
            </Button>
          }
          bordered
        >
          <SearchForm
            form={form}
            name='userSearchForm'
            expandable
            onExpandChange={onExpandChange}
            onFinish={handleSearch}
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name='fullName' label='氏名'>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name='email' label='メールアドレス'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            {expanded && (
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name='tel' label='電話番号'>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </SearchForm>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <Row align='middle' justify='end'>
              <Col>
                <Button
                  type='primary'
                  icon={<DownloadOutlined />}
                  style={{ minWidth: 100 }}
                  disabled={!data?.count}
                  onClick={handleCsvExport}
                >
                  CSVダウンロード
                </Button>
              </Col>
            </Row>
            <Table
              rowKey='id'
              bordered
              loading={isLoading}
              rowSelection={rowSelection}
              dataSource={data?.data}
              columns={columns}
              pagination={{
                total: data?.count,
                current: pagination.current,
                pageSize: pagination.pageSize,
                showTotal: (total, range) =>
                  `${total}件中、${range[0]}〜${range[1]}件を表示`,
                showSizeChanger: true,
                defaultPageSize: 20,
                pageSizeOptions: ['20', '50', '100'],
              }}
              onChange={handleTableChange}
              size='small'
            />
          </Space>
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default UserSearchPage
