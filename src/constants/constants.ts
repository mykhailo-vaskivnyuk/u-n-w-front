import { RoutesMap } from '@components/app/router';
import { ICONS } from '@components/icon/icon';
import { MenuItemProps } from '@components/menu/menu.item';

export const MENU_ITEMS: Omit<MenuItemProps, 'onClick'>[] = [
  {
    id: 1,
    label: 'Авторизуватись',
    pathname: RoutesMap.ACCOUNT.LOGIN.full,
    icon: ICONS.signin,
  },
  {
    id: 2,
    label: 'Вийти',
    pathname: RoutesMap.ACCOUNT.LOGOUT.full,
    icon: ICONS.logout,
  },
];
