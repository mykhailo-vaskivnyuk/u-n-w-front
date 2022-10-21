import { ICONS } from '@components/icon/icon';
import { MenuItemProps } from '@components/menu/menu.item';

export const MENU_ITEMS: Omit<MenuItemProps, 'onClick'>[] = [
  {
    id: 1,
    label: 'Authorization',
    pathname: '/auth',
    icon: ICONS.spinner,
  },
  {
    id: 2,
    label: 'Restore',
    pathname: '/overmail',
    icon: ICONS.spinner,
  },
  {
    id: 3,
    label: 'Registratison',
    pathname: '/signup',
    icon: ICONS.spinner,
  },
];
