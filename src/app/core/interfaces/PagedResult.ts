export interface PagedResult<T> {
  rowCount: number,
  pageCount: number,
  currentPage: number,
  pageSize: number,
  results: T[]
}
