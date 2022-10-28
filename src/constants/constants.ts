import { RoutesMap } from '@components/router/constants';
import { ICONS } from '@components/icon/icon';
import { IMenuItem } from '@components/menu/types';

export const MENU_ITEMS: Record<string, IMenuItem> = {
  ABOUTE: {
    id: 1,
    label: 'Про You & World',
    pathname: RoutesMap.ABOUTE,
    icon: ICONS.spinner,
  },
  LOGOUT: {
    id: 2,
    label: 'Вийти',
    pathname: RoutesMap.ACCOUNT.LOGOUT,
    icon: ICONS.logout,
  },
};

export const menuNotLogin = [MENU_ITEMS.ABOUTE];
export const menuNotConfirmed = [MENU_ITEMS.ABOUTE, MENU_ITEMS.LOGOUT];
export const menuLogin = [MENU_ITEMS.LOGOUT];
