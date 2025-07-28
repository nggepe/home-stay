export const parseListViewParams = (params: Record<string, string | string[] | undefined>) => {
  const page = params.page ? Number(params.page) : undefined;
  const search = params.search ? String(params.search) : undefined;
  const limit = params.limit ? Number(params.limit) : undefined;

  return {
    page,
    search,
    limit,
  };
};
