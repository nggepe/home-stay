import { BreadCrumbsProps } from '@/shared/ui/breadcrumbs';
import { routes } from './routes';

type BreadCrumbItemsKey = 'home' | 'rooms' | 'createRoom';

export const breadCrumbItems: Record<BreadCrumbItemsKey, BreadCrumbsProps['items']> = {
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
};
