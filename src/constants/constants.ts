import { ICONS } from '@components/icon/icon';
import { MenuItemProps } from '@components/menu/menu.item';

export const MENU_ITEMS: Omit<MenuItemProps, 'onClick'>[] = [
  {
    id: 1,
    label: 'Авторизуватись',
    pathname: '/auth',
    icon: ICONS.signin,
  },
  {
    id: 2,
    label: 'Вийти',
    pathname: '/logout',
    icon: ICONS.logout,
  },
  {
    id: 3,
    label: 'Restore',
    pathname: '/overmail',
    icon: ICONS.spinner,
  },
  {
    id: 4,
    label: 'Registration',
    pathname: '/signup',
    icon: ICONS.spinner,
  },
];
