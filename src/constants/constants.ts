import { RoutesMap } from '@components/router/router';
import { ICONS } from '@components/icon/icon';
import { MenuItemProps } from '@components/menu/menu.item';

export const MENU_ITEMS: Omit<MenuItemProps, 'onClick'>[] = [
  {
    id: 1,
    label: 'Авторизуватись',
    pathname: RoutesMap.ACCOUNT.LOGIN,
    icon: ICONS.signin,
  },
  {
    id: 2,
    label: 'Вийти',
    pathname: RoutesMap.ACCOUNT.LOGOUT,
    icon: ICONS.logout,
  },
];
