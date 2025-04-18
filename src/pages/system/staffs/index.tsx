import { DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Col, Form, Input, Row, Space, Table } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import LoginRequired from '@/components/atoms/LoginRequired'
import AppCard from '@/components/molecules/AppCard'
import SearchForm from '@/components/molecules/SearchForm'
import exportStaffCsv from '@/services/staffs/exportStaffCsv'
import useStaffSearch from '@/services/staffs/useStaffSearch'
import type { Staff } from '@/types'
import usePagination from '@/utils/usePagination'

import AppButton from '@/components/atoms/AppButton'
import AppFormItem from '@/components/molecules/AppFormItem'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

const StaffSearchPage = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState({})
  const [expanded, setExpanded] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { pagination, sort, setPagination, setSort } = usePagination()
  const { isLoading, data } = useStaffSearch({
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
      current: 1, // 1ページ目に戻す
      pageSize: pagination.pageSize,
    })
    setQuery({ ...values, ...pagination })
  }

  const handleTableChange = (
    tablePagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<Staff> | SorterResult<Staff>[],
  ) => {
    setPagination({
      current: tablePagination.current,
      pageSize: tablePagination.pageSize,
    })
    setSort(sorter)
  }

  const columns: ColumnsType<Staff> = [
    {
      title: 'ID',
      render: (_, record) => (
        <Link to={`/system/staffs/show/${record.id}`}>{record.id}</Link>
      ),
    },
    {
      title: '氏名',
      dataIndex: 'fullName',
      render: (_text, record) => `${record.lastName} ${record.firstName}`,
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
          <AppButton
            type='link'
            icon={<EditOutlined />}
            onClick={() => {
              navigate(`/system/staffs/edit/${record.id}`)
            }}
          />
        </Space>
      ),
      align: 'center',
      width: 100,
    },
  ]

  const handleCsvExport = () => {
    exportStaffCsv(query)
  }

  return (
    <LoginRequired>
      <AppCard
        title='担当者マスタ検索'
        extra={
          <AppButton
            type='secondary'
            icon={<PlusOutlined />}
            style={{ minWidth: 100 }}
            onClick={() => {
              navigate('/system/staffs/new')
            }}
          >
            新規登録
          </AppButton>
        }
      >
        <SearchForm
          form={form}
          name='staffSearchForm'
          expandable
          onExpandChange={onExpandChange}
          onFinish={handleSearch}
        >
          <Row gutter={24}>
            <Col span={8}>
              <AppFormItem name='fullName' label='氏名'>
                <Input />
              </AppFormItem>
            </Col>
            <Col span={8}>
              <AppFormItem name='email' label='メールアドレス'>
                <Input />
              </AppFormItem>
            </Col>
          </Row>
          {expanded && (
            <Row gutter={24}>
              <Col span={8}>
                <AppFormItem name='tel' label='電話番号'>
                  <Input />
                </AppFormItem>
              </Col>
            </Row>
          )}
        </SearchForm>
        <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
          <Row align='middle' justify='end'>
            <Col>
              <AppButton
                type='primary'
                icon={<DownloadOutlined />}
                style={{ minWidth: 100 }}
                disabled={!data?.count}
                onClick={handleCsvExport}
              >
                CSVダウンロード
              </AppButton>
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
      </AppCard>
    </LoginRequired>
  )
}

export default StaffSearchPage
