import { BreadCrumbsProps } from '@/shared/ui/breadcrumbs';
import { routes } from './routes';

export const breadCrumbItems: Record<string, BreadCrumbsProps['items']> = {
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
};
