import { ICONS } from '@components/icon/icon';
import { MenuItemProps } from '@components/menu/menu.item';

export const MENU_ITEMS: MenuItemProps[] = [
  {
    label: 'Authorization',
    pathname: '/auth',
    icon: ICONS.spinner,
  },
  {
    label: 'Restore',
    pathname: '/overmail',
    icon: ICONS.spinner,
  },
  {
    label: 'Registratison',
    pathname: '/signup',
    icon: ICONS.spinner,
  },
];
