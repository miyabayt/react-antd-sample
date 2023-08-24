import React, { useState } from 'react'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type {
  FilterValue,
  SorterResult,
  TableRowSelection,
} from 'antd/es/table/interface'

type SizeType = 'small' | 'middle' | 'large' | undefined

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

interface SearchResultProps {
  // TODO
  children: React.ReactNode
  loading?: boolean
  tableSize?: SizeType
  //rowSelection?: TableRowSelection
}

const SearchResult = ({
  children,
  loading,
  tableSize = 'small',
}: SearchResultProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })

  return (
    // <Table
    //   bordered
    //   rowSelection={rowSelection}
    //   loading={loading}
    //   dataSource={data?.data}
    //   columns={columns}
    //   pagination={{ pageSize: 20 }}
    //   size='small'
    // />
    <></>
  )
}

export default SearchResult
