export const routes = {
  home: {
    entry: () => '/',
  },
  users: {
    entry: () => '/users',
    detail: (id: number) => ({
      entry: `/users/${id}`,
    }),
    create: {
      entry: () => '/users/create',
    },
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
