import {
  EllipsisOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
import type { ColDef, ColumnState } from 'ag-grid-community'
import { Button, Flex, Select, Space } from 'antd'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import { PAGE_SIZE_LIST } from '@/configs/app'
import SettingMenu from '../SettingMenu'
import PagingButton from './PagingButton'

interface AppPaginationProps {
  loading: boolean
  currentPage: number
  pageSize: number
  totalPages: number
  totalCount: number
  goToPage: (value: number) => void
  onPageSizeChange?: (value: number) => void
  children?: React.ReactNode
  showSettingButton?: boolean
  showAllOption?: boolean
  columnDefs?: ColDef[]
  onColumnStatesChange?: (newColumnStates: ColumnState[]) => void
  onAutoColumnResize?: () => void
  onResetColumnState?: () => void
  disabled?: boolean
}

const AppPagination = (props: AppPaginationProps) => {
  const {
    loading,
    currentPage = 0,
    pageSize,
    totalPages,
    totalCount = 0,
    goToPage,
    onPageSizeChange,
    children,
    showSettingButton = false,
    showAllOption = false,
    columnDefs: initColumnDefs = [],
    onColumnStatesChange,
    onAutoColumnResize,
    onResetColumnState,
    disabled = false,
  } = props
  const [columnDefs] = useState<ColDef[]>(initColumnDefs)
  const [displayTotal, setDisplayTotal] = useState<React.ReactNode>()
  const [pagingButtons, setPagingButtons] = useState<React.ReactNode[]>([])

  const memoizedGoToPage = useCallback(
    (value: number) => {
      goToPage(value)
    },
    [goToPage],
  )

  const updatePageButtons = useCallback(
    (
      currentPage: number,
      totalPages: number,
      goToPage: (page: number) => void,
      disabled: boolean,
    ) => {
      if (loading) {
        return
      }

      const buttons: React.ReactNode[] = []
      const pagesToShow = 4
      const startPage = Math.max(0, currentPage - Math.floor(pagesToShow / 2))
      const endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1)
      const adjustedStartPage = Math.max(0, endPage - pagesToShow + 1)

      if (totalCount > 0) {
        buttons.push(
          <Button
            key='prev'
            onClick={() => goToPage(currentPage - 1)}
            disabled={disabled || currentPage === 0}
            icon={<LeftOutlined />}
          />,
        )
      }

      if (totalPages > 1) {
        buttons.push(
          <PagingButton
            key={0}
            page={0}
            currentPage={currentPage}
            goToPage={goToPage}
            disabled={disabled}
          />,
        )
      }

      if (adjustedStartPage > 1) {
        buttons.push(
          <EllipsisOutlined key='left' style={{ fontSize: '20px' }} />,
        )
      }

      for (
        let i = Math.max(1, adjustedStartPage);
        i <= endPage && i < totalPages - 1;
        i++
      ) {
        buttons.push(
          <PagingButton
            key={i}
            page={i}
            currentPage={currentPage}
            goToPage={goToPage}
            disabled={disabled}
          />,
        )
      }

      if (endPage < totalPages - 2) {
        buttons.push(
          <EllipsisOutlined key='right' style={{ fontSize: '20px' }} />,
        )
      }

      buttons.push(
        <PagingButton
          key={totalPages - 1}
          page={totalPages - 1}
          currentPage={currentPage}
          goToPage={goToPage}
          disabled={disabled}
        />,
      )

      if (totalPages > 0) {
        buttons.push(
          <Button
            key='next'
            onClick={() => goToPage(currentPage + 1)}
            disabled={disabled || currentPage === totalPages - 1}
            icon={<RightOutlined />}
          />,
        )
      }

      setPagingButtons(buttons)
    },
    [loading, totalCount],
  )

  useEffect(() => {
    updatePageButtons(currentPage, totalPages, memoizedGoToPage, disabled)
    setDisplayTotal(
      <div style={{ whiteSpace: 'nowrap' }}>(全{totalCount}件)</div>,
    )
  }, [
    currentPage,
    totalPages,
    totalCount,
    memoizedGoToPage,
    updatePageButtons,
    disabled,
  ])

  const handleColumnStatesChange = useCallback(
    (newColumnStates: ColumnState[]) => {
      if (onColumnStatesChange) {
        onColumnStatesChange(newColumnStates)
      }
    },
    [onColumnStatesChange],
  )

  const handleAutoColumnResize = useCallback(() => {
    if (onAutoColumnResize) {
      onAutoColumnResize()
    }
  }, [onAutoColumnResize])

  const handleResetColumnState = useCallback(() => {
    if (onResetColumnState) {
      onResetColumnState()
    }
  }, [onResetColumnState])

  return (
    <div css={styles.pagination}>
      <Flex wrap gap={10}>
        <Flex className='page-size'>
          <Space direction='horizontal'>
            <Select
              value={pageSize}
              onChange={onPageSizeChange}
              popupMatchSelectWidth={false}
              disabled={disabled}
            >
              {PAGE_SIZE_LIST.map((size) => (
                <Select.Option key={size} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select>
            {displayTotal}
          </Space>
        </Flex>
        <Flex flex='none' className='paging-button-area'>
          <Space direction='horizontal'>{pagingButtons}</Space>
        </Flex>
        <Flex flex='auto' gap={10} justify='flex-end'>
          {children}
          {showSettingButton && columnDefs && (
            <div className='setting-button-area'>
              <SettingMenu
                columnDefs={columnDefs}
                onColumnStatesChange={handleColumnStatesChange}
                onAutoColumnResize={handleAutoColumnResize}
                onResetColumnState={handleResetColumnState}
                disabled={disabled}
              />
            </div>
          )}
        </Flex>
      </Flex>
    </div>
  )
}

const styles = {
  pagination: css`
    padding: 10px 0;

    .page-size {
      min-width: 142px;
    }

    .page-size,
    .paging-button-area {
      .ant-btn {
        padding: 6px;
        min-width: 36px;
        border-radius: 3px;
      }
    }

    .setting-button-area {
      .ant-btn {
        padding: 6px;
        min-width: 36px;
        border-radius: 3px;
      }
    }
  `,
}

AppPagination.displayName = 'AppPagination'

export default AppPagination
