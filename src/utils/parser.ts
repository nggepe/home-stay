export const convertPageToOffset = (page?: number, limit?: number) => {
  return ((page ?? 1) - 1) * (limit ?? 10);
};

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

export const parsePrevPage = (page?: number) => {
  if (page && page > 1) {
    return page - 1;
  }
  return undefined;
};

export const parseNextPage = (page?: number, stop: boolean = false) => {
  if (stop) {
    return undefined;
  }

  return (page ?? 1) + 1;
};
