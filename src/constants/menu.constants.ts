import { RoutesMap } from '@components/router/constants';
import { ICONS } from '@components/icon/icon';
import { IMenuItem } from '@components/menu/types';

export const MENU_ITEMS: IMenuItem[] = [
  // {
  //   label: 'Головна',
  //   pathname: RoutesMap.INDEX,
  //   icon: ICONS.spinner,
  //   userStates: ['NOT_CONFIRMED', 'LOGGEDIN'],
  // },
  {
    label: 'Акаунт',
    pathname: RoutesMap.ACCOUNT.INDEX,
    icon: ICONS.spinner,
    userStates: ['NOT_CONFIRMED', 'LOGGEDIN', 'INSIDE_NET'],
  },
  {
    label: 'Про You & World',
    pathname: RoutesMap.ABOUT,
    icon: ICONS.spinner,
    userStates: ['NOT_LOGGEDIN', 'NOT_CONFIRMED', 'LOGGEDIN', 'INSIDE_NET'],
  },
  {
    label: 'Авторизуватись',
    pathname: RoutesMap.ACCOUNT.LOGIN,
    icon: ICONS.login,
    userStates: ['NOT_LOGGEDIN'],
  },
  {
    label: 'Вийти',
    pathname: RoutesMap.ACCOUNT.LOGOUT,
    icon: ICONS.logout,
    userStates: ['NOT_CONFIRMED', 'LOGGEDIN', 'INSIDE_NET'],
  },
  {
    label: 'Палітра',
    pathname: RoutesMap.PALETTE,
    icon: ICONS.logout,
    userStates: ['DEV'],
  },
  {
    label: 'Шаблон email',
    pathname: RoutesMap.MAIL,
    icon: ICONS.logout,
    userStates: ['DEV'],
  },
];

export const MENU_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Вийти',
    pathname: RoutesMap.NET.COMEOUT,
    icon: ICONS.spinner,
    userStates: ['INSIDE_NET'],
  },
  {
    label: 'Створити',
    pathname: RoutesMap.NET.CREATE,
    icon: ICONS.spinner,
    userStates: ['LOGGEDIN', 'INSIDE_NET'],
  },
  {
    label: 'Покинути назавжди',
    pathname: RoutesMap.NET.LEAVE,
    icon: ICONS.spinner,
    userStates: ['INSIDE_NET'],
  },
];

export const MENU_SIBLING_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Sibling Net 1',
    pathname: RoutesMap.INDEX,
    icon: ICONS.logout,
    userStates: ['INSIDE_NET'],
  },
  {
    label: 'Sibling Net 2',
    pathname: RoutesMap.INDEX,
    icon: ICONS.logout,
    userStates: ['INSIDE_NET'],
  },
];

export const MENU_CHILD_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Child Net 1',
    pathname: RoutesMap.INDEX,
    icon: ICONS.login,
    userStates: ['INSIDE_NET'],
  },
  {
    label: 'Child Net 2',
    pathname: RoutesMap.INDEX,
    icon: ICONS.login,
    userStates: ['INSIDE_NET'],
  },
];
