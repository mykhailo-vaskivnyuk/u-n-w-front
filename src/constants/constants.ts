import { RoutesMap } from '@components/router/constants';
import { ICONS } from '@components/icon/icon';
import { IMenuItem } from '@components/menu/types';

export const MENU_ITEMS: Record<string, IMenuItem> = {
  ABOUT: {
    label: 'Про You & World',
    pathname: RoutesMap.ABOUT,
    icon: ICONS.spinner,
  },
  LOGIN: {
    label: 'Авторизуватись',
    pathname: RoutesMap.ACCOUNT.LOGIN,
    icon: ICONS.login,
  },
  LOGOUT: {
    label: 'Вийти',
    pathname: RoutesMap.ACCOUNT.LOGOUT,
    icon: ICONS.logout,
  },
};

export const menuNotLogin = [MENU_ITEMS.LOGIN, MENU_ITEMS.ABOUT];
export const menuNotConfirmed = [MENU_ITEMS.ABOUT, MENU_ITEMS.LOGOUT];
export const menuLogin = [MENU_ITEMS.ABOUT, MENU_ITEMS.LOGOUT];
