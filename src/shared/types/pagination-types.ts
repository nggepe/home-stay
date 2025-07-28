export interface PaginationRepositoryProps extends Record<string, string | string[] | undefined> {
  page?: string;
  search?: string;
  limit?: string;
}

export interface PaginationRepositoryResponse<T> {
  data: T[];
  pagination: Pick<PaginationRepositoryProps, 'page'> & { next?: number; prev?: number };
}
