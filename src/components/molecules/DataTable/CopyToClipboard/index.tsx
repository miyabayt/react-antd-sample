import type { ColDef, ValueFormatterParams } from 'ag-grid-community'
import type { AgGridReact } from 'ag-grid-react'
import copy from 'copy-to-clipboard'
import { type RefObject, useEffect, useRef } from 'react'

interface CopyToClipboardProps {
  columnDefs: ColDef[]
  gridRef: RefObject<AgGridReact | null>
}

const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { columnDefs, gridRef } = props
  const copyButtonRef = useRef<HTMLButtonElement | null>(null)

  // biome-ignore lint/suspicious/noExplicitAny: _
  const formatCellValue = (field: string, value: any): string => {
    const columnDef = columnDefs.find((col) => col.field === field)
    if (columnDef?.valueFormatter) {
      if (typeof columnDef.valueFormatter === 'function') {
        return columnDef.valueFormatter({ value } as ValueFormatterParams)
      }
      return columnDef.valueFormatter
    }
    return String(value)
  }

  useEffect(() => {
    const handleCopy = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'c') {
        event.preventDefault() // デフォルトのコピー動作をキャンセル
        if (copyButtonRef.current) {
          copyButtonRef.current.click() // ボタンをクリックしてコピー
        }
      }
    }

    document.addEventListener('keyup', handleCopy)
    return () => {
      document.removeEventListener('keyup', handleCopy)
    }
  }, [])

  const handleButtonClick = () => {
    if (gridRef.current) {
      const focusedCell = gridRef.current.api.getFocusedCell()

      if (focusedCell) {
        const rowIndex = focusedCell.rowIndex
        const field = focusedCell.column.getColId()
        const rowNode = gridRef.current.api.getDisplayedRowAtIndex(rowIndex)

        if (rowNode) {
          const rawValue = rowNode.data[field]
          const formattedValue = formatCellValue(field, rawValue)

          // クリップボードにコピー
          copy(formattedValue)

          gridRef.current.api.setFocusedCell(
            focusedCell.rowIndex,
            focusedCell.column,
          )
        }
      }
    }
  }

  return (
    <button
      type='button'
      ref={copyButtonRef}
      style={{ display: 'none' }}
      onClick={handleButtonClick}
    />
  )
}

export default CopyToClipboard
