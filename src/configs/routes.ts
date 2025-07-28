export const routes = {
  home: {
    entry: () => '/',
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
};
