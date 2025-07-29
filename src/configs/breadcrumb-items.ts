import { routes } from './routes';

export const breadCrumbItems = {
  home: [
    {
      href: routes.home.entry(),
      label: 'Home',
      active: true,
    },
  ],
  rooms: [
    {
      href: routes.home.entry(),
      label: 'Home',
    },
    {
      href: routes.rooms.entry(),
      label: 'Rooms',
      active: true,
    },
  ],
  createRoom: [
    {
      href: routes.home.entry(),
      label: 'Home',
    },
    {
      href: routes.rooms.entry(),
      label: 'Rooms',
    },
    {
      href: routes.rooms.create.entry(),
      label: 'Create Room',
      active: true,
    },
  ],
  detailRoom: (id: number, name: string) => [
    {
      href: routes.home.entry(),
      label: 'Home',
    },
    {
      href: routes.rooms.entry(),
      label: 'Rooms',
    },
    {
      href: routes.rooms.detail(id).entry,
      label: name,
      active: true,
    },
  ],
};
