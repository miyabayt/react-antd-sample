import { DEFAULT_PAGE_SIZE, PAGE_SIZE_LIST } from '@/configs/app'
import useSettingsStore from '@/stores/useSettingsStore'
import usePagination from '@/utils/usePagination'
import type {
  ColDef,
  ColumnState,
  GridApi,
  GridOptions,
  GridReadyEvent,
  GridState,
  RowClassParams,
  RowSelectionOptions,
  RowStyle,
  StateUpdatedEvent,
} from 'ag-grid-community'
import { themeAlpine } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { Flex, theme } from 'antd'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLocation, useSearchParams } from 'react-router'
import AppPagination from './AppPagination'
import CopyToClipboard from './CopyToClipboard'
import NoRowsAlert from './NoRowsAlert'

type DataTableProps = {
  isLoading: boolean
  columnDefs: ColDef[]
  totalCount: number
  // biome-ignore lint/suspicious/noExplicitAny: _
  rowData: any[]
  rowSelectionMode?: 'singleRow' | 'multiRow' | false
  // biome-ignore lint/suspicious/noExplicitAny: _
  onSelectionChanged?: (selectedRows: any[]) => void
  showAllOption?: boolean
  disablePagination?: boolean
  disableSort?: boolean
  suppressMovableColumns?: boolean
  headerSlot?: React.ReactNode
}

export type DataTableRef = {
  getColumnStates: () => ColumnState[]
  setColumnStates: (cs: ColumnState[]) => void
  api: GridApi
} & DataTableProps

const DataTable = forwardRef<DataTableRef, DataTableProps>(
  (props: DataTableProps, ref) => {
    const {
      isLoading,
      columnDefs: initColumnDefs,
      totalCount = 0,
      rowData,
      rowSelectionMode = false,
      onSelectionChanged,
      showAllOption = false,
      disablePagination = false,
      disableSort = false,
      suppressMovableColumns = false,
      headerSlot,
      ...restProps
    } = props

    const { token } = theme.useToken()
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const pathname = location.pathname

    const gridRef = useRef<AgGridReact>(null)
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(initColumnDefs)
    const [lastColumnDefs, setLastColumnDefs] = useState<ColDef[]>(columnDefs)
    const gridStates = useSettingsStore((state) => state.gridStates)
    const columnStatesMap = useSettingsStore((state) => state.columnStatesMap)
    const columnStates = useMemo(
      () => columnStatesMap[pathname],
      [columnStatesMap, pathname],
    )
    const setGridState = useCallback(
      (gs: GridState) => useSettingsStore.getState().setGridState(pathname, gs),
      [pathname],
    )
    const setColumnStates = useCallback(
      (cs: ColumnState[]) =>
        useSettingsStore.getState().setColumnStatesMap(pathname, cs),
      [pathname],
    )

    const [totalPages, setTotalPages] = useState(1)
    const { pagination, setPagination, setSort } = usePagination()

    const gridOptions: GridOptions = useMemo(
      () => ({
        selectionColumnDef: {
          pinned: 'left',
        },
        getRowStyle: (params: RowClassParams): RowStyle | undefined => {
          const lastRowIndex = params.api.getDisplayedRowCount() - 1
          if (params.node.rowIndex === lastRowIndex) {
            return {
              borderBottom: `1px solid ${token.colorBorder}`,
            }
          }
          return undefined
        },
      }),
      [],
    )

    const defaultColDef = useMemo(
      () => ({
        sortable: true,
        unSortIcon: true,
        filter: false,
        comparator: () => 0,
      }),
      [],
    )

    const rowSelection: RowSelectionOptions | undefined = useMemo(() => {
      if (!rowSelectionMode) return undefined

      return {
        mode: rowSelectionMode,
        enableClickSelection: false,
        checkboxes: true,
        headerCheckbox: true,
      }
    }, [rowSelectionMode])

    useImperativeHandle(ref, () => ({
      getColumnStates: () => columnStates,
      setColumnStates,
      api: gridRef.current?.api as GridApi,
      ...props,
    }))

    useEffect(() => {
      const pageQuery = searchParams.get('page')
      if (pageQuery) {
        const page = Number(pageQuery)
        if (page === 0) {
          setPagination({
            current: 0,
          })
        }
      }
    }, [])

    useEffect(() => {
      if (totalCount === 0) return
      const newTotalPages = Math.ceil(totalCount / pagination.pageSize)
      if (totalPages !== newTotalPages) {
        setTotalPages(newTotalPages || 1)
      }
    }, [totalCount, pagination.pageSize])

    useEffect(() => {
      if (disableSort) {
        setLastColumnDefs(columnDefs)
        setColumnDefs((colDefs) =>
          colDefs.map((colDef) => ({
            ...colDef,
            sortable: false,
          })),
        )
      } else {
        setColumnDefs(lastColumnDefs)
      }
    }, [disableSort])

    const handleGridReady = useCallback(
      (event: GridReadyEvent) => {
        // 表示件数の初期値はローカルストレージから取得する
        const newPageSize = pagination.pageSize || DEFAULT_PAGE_SIZE
        if (newPageSize > Math.max(...PAGE_SIZE_LIST)) {
          // 初期表示では全件にしない
          setPagination({ current: 0, pageSize: DEFAULT_PAGE_SIZE })
        }

        if (!columnStates) {
          const colStates = event.api.getColumnState()
          setColumnStates(colStates)
        } else {
          event.api.applyColumnState({
            state: columnStates,
            applyOrder: true,
          })
        }
      },
      [pagination, totalCount, columnStates, setColumnStates],
    )

    const goToPage = useCallback(
      (value: number) => {
        setPagination({
          current: value,
        })
        searchParams.set('page', String(value))
        setSearchParams(searchParams)
      },
      [setPagination, setSearchParams],
    )

    // 表示件数の変更イベント
    const handlePageSizeChange = useCallback(
      (value: number) => {
        setPagination({
          current: 0,
          pageSize: value,
        })
        searchParams.set('page', String(0))
        setSearchParams(searchParams)
      },
      [setPagination, setSearchParams],
    )

    // 列定義の変更イベント
    const handleColumnStatesChange = useCallback(
      (newColumnStates: ColumnState[]) => {
        if (gridRef.current) {
          gridRef.current.api.applyColumnState({
            state: newColumnStates,
            applyOrder: true,
          })
        }
      },
      [],
    )

    // 列幅の調整
    const handleAutoColumnResize = useCallback(() => {
      if (gridRef.current) {
        gridRef.current.api.autoSizeAllColumns()
      }
    }, [])

    // リセット
    const handleResetColumnState = useCallback(() => {
      if (gridRef.current) {
        gridRef.current.api.resetColumnState()
        const colStates = gridRef.current.api.getColumnState()
        setColumnStates(colStates)
      }
    }, [setColumnStates])

    //　ソート
    const handleSortChanged = useCallback(() => {
      if (gridRef.current) {
        const colStates = gridRef.current.api.getColumnState()
        const sortState = colStates?.find((s) => s.sort != null)

        if (sortState?.sort && sortState.colId) {
          setSort({
            sortField: sortState.colId,
            sortOrder: sortState.sort,
          })
        } else {
          setSort({
            sortField: undefined,
            sortOrder: undefined,
          })
        }

        setPagination({
          current: 0,
        })
      }
    }, [setSort])

    // 選択行
    const handleSelectionChanged = useCallback(() => {
      if (gridRef.current && onSelectionChanged) {
        const selectedRows = gridRef.current?.api.getSelectedRows()
        onSelectionChanged(selectedRows)
      }
    }, [onSelectionChanged])

    const handleStateUpdated = useCallback(
      (event: StateUpdatedEvent) => {
        if (!event.sources.includes('gridInitializing')) {
          setGridState(event.state)
        }
      },
      [setGridState],
    )

    const myTheme = useMemo(
      () =>
        themeAlpine.withParams({
          headerHeight: '40px',
          headerBackgroundColor: token.colorBgLayout,
          headerColumnBorder: { color: token.colorBorder },
          headerColumnBorderHeight: '100%',
          headerColumnResizeHandleColor: 'transparent',
          borderColor: token.colorBorder,
          columnBorder: { color: token.colorBorder },
          rowBorder: { color: token.colorBorder },
        }),
      [token],
    )

    return (
      <div>
        {isLoading || totalCount > 0 ? (
          <>
            <AppPagination
              loading={isLoading}
              currentPage={pagination.current}
              pageSize={pagination.pageSize}
              totalPages={totalPages}
              totalCount={totalCount}
              goToPage={goToPage}
              onPageSizeChange={handlePageSizeChange}
              columnDefs={columnDefs}
              onColumnStatesChange={handleColumnStatesChange}
              onAutoColumnResize={handleAutoColumnResize}
              onResetColumnState={handleResetColumnState}
              showSettingButton={false} // 高さがたりないため下部のみに表示する
              showAllOption={showAllOption}
              disabled={disablePagination}
            >
              <Flex flex={1} justify='flex-end'>
                {headerSlot}
              </Flex>
            </AppPagination>
            <AgGridReact
              {...restProps}
              theme={myTheme}
              ref={gridRef}
              loading={isLoading}
              initialState={gridStates}
              gridOptions={gridOptions}
              onGridReady={handleGridReady}
              onSortChanged={handleSortChanged}
              onSelectionChanged={handleSelectionChanged}
              rowData={rowData}
              suppressMultiSort={true}
              suppressMovableColumns={suppressMovableColumns}
              suppressDragLeaveHidesColumns={true}
              suppressColumnMoveAnimation={true}
              suppressCellFocus={false}
              defaultColDef={defaultColDef}
              columnDefs={columnDefs}
              rowSelection={rowSelection}
              pagination={false}
              onStateUpdated={handleStateUpdated}
              tooltipShowDelay={0}
              domLayout='autoHeight'
            />
            <AppPagination
              loading={isLoading}
              currentPage={pagination.current}
              pageSize={pagination.pageSize}
              totalPages={totalPages}
              totalCount={totalCount}
              goToPage={goToPage}
              onPageSizeChange={handlePageSizeChange}
              columnDefs={columnDefs}
              onColumnStatesChange={handleColumnStatesChange}
              onAutoColumnResize={handleAutoColumnResize}
              onResetColumnState={handleResetColumnState}
              showSettingButton={true}
              showAllOption={showAllOption}
              disabled={disablePagination}
            />
            <CopyToClipboard columnDefs={columnDefs} gridRef={gridRef} />
          </>
        ) : (
          <>
            <NoRowsAlert />
          </>
        )}
      </div>
    )
  },
)

DataTable.displayName = 'DataTable'

export default DataTable
