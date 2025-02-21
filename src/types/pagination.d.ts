export interface Pagination {
  current: number
  pageSize: number
}

export interface PageInfo {
  current?: number
  pageSize?: number
}

export interface Sort {
  sortField?: string | undefined
  sortOrder?: string | undefined
}

export interface Pages {
  [key: string]: Pagination
}

export interface Sorts {
  [key: string]: Sort | Sort[]
}

export interface PaginationState {
  pages: Pages
  sorts: Sorts
}
