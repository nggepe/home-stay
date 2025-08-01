export const routes = {
  home: {
    entry: () => '/',
  },
  users: {
    entry: () => '/users',
  },
  rooms: {
    entry: () => '/rooms',
    create: {
      entry: () => '/rooms/create',
    },
    detail: (id: number) => ({
      entry: `/rooms/${id}`,
    }),
  },
  services: {
    entry: () => '/services',
    create: {
      entry: () => '/services/create',
    },
    detail: (id: number) => ({
      entry: `/services/${id}`,
    }),
  },
  sales: {
    entry: () => '/sales',
    create: {
      entry: () => '/sales/create',
    },
    detail: (id: number) => ({
      entry: `/sales/${id}`,
    }),
  },
};
