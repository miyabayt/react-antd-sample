import { DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import exportUserCsv from '@/services/users/exportUserCsv'
import useUserSearch from '@/services/users/useUserSearch'
import type { User } from '@/types/user'
import usePagination from '@/utils/usePagination'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

const UserSearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState({})
  const [expanded, setExpanded] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { pagination, sort, setPagination, setSort } = usePagination()
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
    setPagination({
      current: 0, // 1ページ目に戻す
      pageSize: pagination.pageSize,
    })
    setQuery({ ...values, ...pagination })
  }

  const handleTableChange = (
    tablePagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[],
  ) => {
    setPagination({
      current: tablePagination.current,
      pageSize: tablePagination.pageSize,
    })
    setSort(sorter)
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
    </LoginRequired>
  )
}

export default UserSearchPage
