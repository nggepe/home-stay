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
  services: [
    {
      href: routes.home.entry(),
      label: 'Home',
    },
    {
      href: routes.services.entry(),
      label: 'Services',
      active: true,
    },
  ],
  createService: [
    {
      href: routes.home.entry(),
      label: 'Home',
    },
    {
      href: routes.services.entry(),
      label: 'Services',
    },
    {
      href: routes.services.create.entry(),
      label: 'Create Service',
      active: true,
    },
  ],
  detailService: (id: number, name: string) => [
    {
      href: routes.home.entry(),
      label: 'Home',
    },
    {
      href: routes.services.entry(),
      label: 'Services',
    },
    {
      href: routes.services.detail(id).entry,
      label: name,
      active: true,
    },
  ],
  sales: [
    {
      href: routes.home.entry(),
      label: 'Home',
    },
    {
      href: routes.sales.entry(),
      label: 'Sales',
      active: true,
    },
  ],
  createSales: [
    {
      href: routes.home.entry(),
      label: 'Home',
    },
    {
      href: routes.sales.entry(),
      label: 'Sales',
    },
    {
      href: routes.sales.create.entry(),
      label: 'Create Sales',
      active: true,
    },
  ],
};
