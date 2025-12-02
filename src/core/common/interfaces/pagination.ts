export interface PaginatedResult<T> {
  pageNumber: number;
  pageSize: number;
  count: number;
  totalPage: number;
  items: T[];
}
