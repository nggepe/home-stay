export interface PageProps<TParams = unknown, TSearchParams = unknown> {
  searchParams: Promise<Record<string, string | string[] | undefined> & TSearchParams>;
  params: Promise<Record<string, string | string[] | undefined> & TParams>;
}
