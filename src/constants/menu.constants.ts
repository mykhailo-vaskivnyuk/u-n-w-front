import { RoutesMap } from '@constants/router.constants';
import { IMenuItem } from '@components/menu/types';
import { ICONS } from '@components/icon/icon';

export const MENU_ITEMS: IMenuItem[] = [
  {
    label: 'Акаунт',
    pathname: RoutesMap.ACCOUNT.INDEX,
    icon: ICONS.spinner,
    allowForUser: 'NOT_CONFIRMED',
  },
  {
    label: 'Про You & World',
    pathname: RoutesMap.ABOUT,
    icon: ICONS.spinner,
    allowForUser: 'NOT_LOGGEDIN',
  },
  {
    label: 'Авторизуватись',
    pathname: RoutesMap.ACCOUNT.LOGIN,
    icon: ICONS.login,
    allowForUser: ['NOT_LOGGEDIN'],
  },
  {
    label: 'Вийти',
    pathname: RoutesMap.ACCOUNT.LOGOUT,
    icon: ICONS.logout,
    allowForUser: 'NOT_CONFIRMED',
  },
  {
    label: 'Палітра',
    pathname: RoutesMap.PALETTE,
    icon: ICONS.logout,
    allowForUser: 'DEV',
  },
  {
    label: 'Шаблон email',
    pathname: RoutesMap.MAIL,
    icon: ICONS.logout,
    allowForUser: 'DEV',
  },
];

export const MENU_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Вийти',
    pathname: RoutesMap.NET.COMEOUT,
    icon: ICONS.spinner,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Створити',
    pathname: RoutesMap.NET.CREATE,
    icon: ICONS.spinner,
    allowForUser: 'LOGGEDIN',
  },
  {
    label: 'Покинути назавжди',
    pathname: RoutesMap.NET.LEAVE,
    icon: ICONS.spinner,
    allowForUser: 'INSIDE_NET',
  },
];

export const MENU_SIBLING_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Sibling Net 1',
    pathname: RoutesMap.INDEX,
    icon: ICONS.logout,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Sibling Net 2',
    pathname: RoutesMap.INDEX,
    icon: ICONS.logout,
    allowForUser: 'INSIDE_NET',
  },
];

export const MENU_CHILD_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Child Net 1',
    pathname: RoutesMap.INDEX,
    icon: ICONS.login,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Child Net 2',
    pathname: RoutesMap.INDEX,
    icon: ICONS.login,
    allowForUser: 'INSIDE_NET',
  },
];
