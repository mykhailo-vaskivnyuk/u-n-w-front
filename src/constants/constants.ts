import { RoutesMap } from '@components/router/constants';
import { ICONS } from '@components/icon/icon';
import { IMenuItem } from '@components/menu/types';

export const MENU_ITEMS: IMenuItem[] = [
  {
    label: 'Головна',
    pathname: RoutesMap.INDEX,
    icon: ICONS.spinner,
    menu: ['notConfirmed', 'logedIn'],
  },
  {
    label: 'Акаунт',
    pathname: RoutesMap.ACCOUNT.INDEX,
    icon: ICONS.spinner,
    menu: ['notConfirmed', 'logedIn'],
  },
  {
    label: 'Про You & World',
    pathname: RoutesMap.ABOUT,
    icon: ICONS.spinner,
    menu: ['notLogedIn', 'notConfirmed', 'logedIn'],
  },
  {
    label: 'Авторизуватись',
    pathname: RoutesMap.ACCOUNT.LOGIN,
    icon: ICONS.login,
    menu: ['notLogedIn'],
  },
  {
    label: 'Вийти',
    pathname: RoutesMap.ACCOUNT.LOGOUT,
    icon: ICONS.logout,
    menu: ['notConfirmed', 'logedIn'],
  },
  {
    label: 'Палітра',
    pathname: RoutesMap.PALETTE,
    icon: ICONS.logout,
    menu: ['dev'],
  },
  {
    label: 'Шаблон email',
    pathname: RoutesMap.MAIL,
    icon: ICONS.logout,
    menu: ['dev'],
  },
];
