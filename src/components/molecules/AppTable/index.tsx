import { css } from '@emotion/react'
import { Checkbox, Flex, Space, Table, type TableProps, theme } from 'antd'
import _ from 'lodash'
import { union } from 'lodash'
import type React from 'react'
import { useRef, useState } from 'react'

interface AppTableProps extends TableProps {
  selectedRowKeys?: React.Key[]
  setSelectedRowKeys?: (keys: React.Key[]) => void
  showSelectAllOnTop?: boolean // 表の上部に全選択チェックボックスを配置する
  showSelectedOrder?: boolean // 選択チェックボックスの横に番号を表示する
  groupingKey?: string
  belowFooter?: React.ReactNode
}

const AppTable = (props: AppTableProps) => {
  const {
    selectedRowKeys: propSelectedRowKeys,
    setSelectedRowKeys: propSetSelectedRowKeys,
    showSelectAllOnTop = false,
    showSelectedOrder = false,
    groupingKey = undefined,
    belowFooter = undefined,
    dataSource,
    columns,
    showHeader = false,
    pagination = false,
    ...restProps
  } = props

  const tableRef = useRef(null)
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] = useState<
    React.Key[]
  >([])
  const selectedRowKeys =
    propSelectedRowKeys !== undefined
      ? propSelectedRowKeys
      : internalSelectedRowKeys
  const setSelectedRowKeys =
    propSetSelectedRowKeys !== undefined
      ? propSetSelectedRowKeys
      : setInternalSelectedRowKeys
  const { token } = theme.useToken()

  const getSelectableKeys = () => {
    // 全選択チェックボックスで選択できる範囲のキーのみを返す
    let selectableKeys: React.Key[] = []
    if (dataSource) {
      selectableKeys = dataSource
        .filter((item) => !groupingKey || !item[groupingKey])
        .map((item) => item.key)
    }
    return selectableKeys
  }

  const handleSelectAllChanged = (e: { target: { checked: boolean } }) => {
    if (!dataSource) return
    if (e.target.checked) {
      if (dataSource.length > 0) {
        const newKeys = dataSource
          .filter((item) => !groupingKey || !item[groupingKey])
          .map((item) => item.key)
        setSelectedRowKeys(union(selectedRowKeys, newKeys))
      }
    } else {
      const selectableKeys = getSelectableKeys()
      const newSelectedRowKeys = _.difference(selectedRowKeys, selectableKeys)
      setSelectedRowKeys(newSelectedRowKeys) // 選択解除
    }
  }

  const styles = {
    tableContainer: css`
      //
    `,
  }

  return (
    <div css={styles.tableContainer}>
      {showSelectAllOnTop && (
        <Space align='center' style={{ marginLeft: 10, marginBottom: 10 }}>
          <Checkbox
            onChange={handleSelectAllChanged}
            checked={
              dataSource &&
              dataSource?.length > 0 &&
              dataSource
                .filter((item) => !groupingKey || !item[groupingKey]) // グループヘッダーを除く
                .every((item) => selectedRowKeys.includes(item.key))
            }
            indeterminate={
              dataSource &&
              dataSource.length > 0 &&
              dataSource.some((item) => selectedRowKeys.includes(item.key)) && // いずれかのキーが含まれる
              !dataSource
                .filter((item) => !groupingKey || !item[groupingKey])
                .every((item) => selectedRowKeys.includes(item.key))
            }
          >
            全てを選択
          </Checkbox>
        </Space>
      )}
      <Table
        ref={tableRef}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        showHeader={showHeader}
        rowSelection={{
          fixed: 'left',
          selectedRowKeys,
          onChange: (selectedKeys: React.Key[]) => {
            const selectableKeys = getSelectableKeys()
            let newSelectedRowKeys = _.difference(
              selectedRowKeys,
              selectableKeys,
            )
            newSelectedRowKeys = union(newSelectedRowKeys, selectedKeys)
            setSelectedRowKeys(newSelectedRowKeys)
          },
          renderCell: (value, record, index, originNode) => {
            if (showSelectedOrder) {
              return (
                <Flex
                  gap={2}
                  align='center'
                  style={{ paddingLeft: 6, width: 44 }}
                >
                  {originNode}
                  {selectedRowKeys.indexOf(record.key) !== -1 && (
                    <span>{selectedRowKeys.indexOf(record.key) + 1}.</span>
                  )}
                </Flex>
              )
            }
            return originNode
          },
          onCell: (record) => {
            return {
              style: { backgroundColor: token.Table?.headerBg },
              colSpan: groupingKey && record[groupingKey] ? 0 : 1,
            }
          },
        }}
        {...restProps}
      />
      {belowFooter && <div style={{ padding: 10 }}>{belowFooter}</div>}
    </div>
  )
}

export default AppTable
