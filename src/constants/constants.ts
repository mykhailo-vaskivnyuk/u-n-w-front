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

export const MENU_NET_ITEMS: IMenuItem[] = [
  {
    label: 'На головну',
    pathname: RoutesMap.INDEX,
    icon: ICONS.spinner,
    menu: ['insideNet'],
  },
  {
    label: 'Створити',
    pathname: RoutesMap.INDEX,
    icon: ICONS.spinner,
    menu: ['logedIn'],
  },
  {
    label: 'Покинути назавжди',
    pathname: RoutesMap.INDEX,
    icon: ICONS.spinner,
    menu: ['insideNet'],
  },
];

export const MENU_PARENT_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Parent Net 1',
    pathname: RoutesMap.INDEX,
    icon: ICONS.logout,
    menu: ['insideNet'],
  },
  {
    label: 'Parent Net 2',
    pathname: RoutesMap.INDEX,
    icon: ICONS.logout,
    menu: ['insideNet'],
  },
];

export const MENU_SIBLING_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Sibling Net 1',
    pathname: RoutesMap.INDEX,
    icon: ICONS.logout,
    menu: ['insideNet'],
  },
  {
    label: 'Sibling Net 2',
    pathname: RoutesMap.INDEX,
    icon: ICONS.logout,
    menu: ['insideNet'],
  },
];

export const MENU_CHILD_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Child Net 1',
    pathname: RoutesMap.INDEX,
    icon: ICONS.login,
    menu: ['insideNet'],
  },
  {
    label: 'Child Net 2',
    pathname: RoutesMap.INDEX,
    icon: ICONS.login,
    menu: ['insideNet'],
  },
];
