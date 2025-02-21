import useSettingsStore from '@/stores/useSettingsStore'
import {
  ColumnWidthOutlined,
  EyeOutlined,
  SettingOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import type { ColDef, ColumnState } from 'ag-grid-community'
import { Button, Dropdown, type MenuProps, Radio, Space, Switch } from 'antd'
import type React from 'react'
import { useCallback, useState } from 'react'
import { useLocation } from 'react-router'
import { useShallow } from 'zustand/shallow'

interface SettingMenuProps {
  columnDefs: ColDef[]
  onColumnStatesChange: (newColumnState: ColumnState[]) => void
  onAutoColumnResize: () => void
  onResetColumnState: () => void
  disabled?: boolean
}

const SettingMenu: React.FC<SettingMenuProps> = ({
  columnDefs: initColumnDefs,
  onColumnStatesChange,
  onAutoColumnResize,
  onResetColumnState,
  disabled = false,
}) => {
  const location = useLocation()
  const pathname = location.pathname

  const [columnDefs] = useState<ColDef[]>(initColumnDefs)
  const columnStates = useSettingsStore(
    useShallow((state) => state.columnStatesMap[pathname]),
  )
  const setColumnStates = useCallback(
    (cs: ColumnState[]) =>
      useSettingsStore.getState().setColumnStatesMap(pathname, cs),
    [pathname],
  )

  const handleHideChange = useCallback(
    (field: string, checked: boolean) => {
      for (const columnState of columnStates) {
        if (columnState.colId === field) {
          columnState.hide = !checked
        }
      }
      setColumnStates(columnStates)
      onColumnStatesChange(columnStates)
    },
    [columnStates, setColumnStates, onColumnStatesChange],
  )

  const handlePinChange = useCallback(
    (colId: string, position: 'left' | 'right' | 'none') => {
      for (const columnState of columnStates) {
        if (columnState.colId === colId) {
          if (position === 'none') {
            columnState.pinned = null
          } else {
            columnState.pinned = position
          }
        }
      }
      setColumnStates(columnStates)
      onColumnStatesChange(columnStates)
    },
    [columnStates, setColumnStates, onColumnStatesChange],
  )

  const items: MenuProps['items'] = [
    {
      key: 'display-setting',
      label: '表示項目設定',
      icon: <EyeOutlined />,
      children: columnDefs.map((col) => {
        if (!col || !col.field) return null

        const fieldName = col.field
        const columnState = columnStates?.find(
          (columnState) =>
            columnState.colId === col.colId || columnState.colId === col.field,
        )
        const hide = columnState ? columnState?.hide : false
        const pinned = columnState ? columnState?.pinned : null

        return {
          key: fieldName,
          label: col.headerName,
          style: { minWidth: 200 },
          children: [
            {
              key: `${fieldName}-checkbox`,
              label: (
                <div onClick={(e) => e.stopPropagation()}>
                  <Space>
                    <Switch
                      value={!hide}
                      onClick={(_, e) => e.stopPropagation()}
                      onChange={(checked) =>
                        handleHideChange(fieldName, checked)
                      }
                    />
                    表示する
                  </Space>
                </div>
              ),
            },
            {
              key: `${fieldName}-pin`,
              label: (
                <div onClick={(e) => e.stopPropagation()}>
                  <Radio.Group
                    size='small'
                    value={
                      pinned === null || pinned === undefined ? 'none' : pinned
                    }
                    onChange={(e) =>
                      handlePinChange(
                        fieldName,
                        e.target.value as 'left' | 'right' | 'none',
                      )
                    }
                    optionType='button'
                    buttonStyle='solid'
                  >
                    <Radio value='none'>固定しない</Radio>
                    <Radio value='left'>左側に固定</Radio>
                    <Radio value='right'>右側に固定</Radio>
                  </Radio.Group>
                </div>
              ),
            },
          ],
        }
      }),
    },
    {
      key: 'column-resize',
      label: '列幅の自動調整',
      icon: <ColumnWidthOutlined />,
      onClick: () => {
        onAutoColumnResize()
      },
    },
    {
      key: 'reset',
      label: 'リセット',
      icon: <UndoOutlined />,
      onClick: () => {
        onResetColumnState()
      },
    },
  ]

  return (
    <Dropdown
      menu={{
        style: { minWidth: 200 },
        items,
      }}
      trigger={['click']}
      disabled={disabled}
    >
      <Button
        icon={<SettingOutlined />}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      />
    </Dropdown>
  )
}

SettingMenu.displayName = 'SettingMenu'

export default SettingMenu
