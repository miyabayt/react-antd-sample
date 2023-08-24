export interface Pagination {
  current: number
  pageSize: number
}

export interface Sort {
  sortField: string
  sortOrder: string
}

export interface Pages {
  [key: string]: Pagination
}

export interface Sorts {
  [key: string]: Sort
}

export interface PaginationState {
  pages: Pages
  sorts: Sorts
}
