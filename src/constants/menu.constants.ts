import { RoutesMap } from '@constants/router.constants';
import { IMenuItem } from '@components/menu/types';
import { ICONS } from '@components/icon/icon';

export const MENU_ITEMS: IMenuItem[] = [
  {
    label: 'Про You & World',
    href: RoutesMap.ABOUT,
    icon: ICONS.about,
    allowForUser: 'NOT_LOGGEDIN',
  },
  {
    label: 'Авторизуватись',
    href: RoutesMap.ACCOUNT.LOGIN,
    icon: ICONS.login,
    allowForUser: ['NOT_LOGGEDIN'],
  },
  {
    label: 'Акаунт',
    href: RoutesMap.ACCOUNT.INDEX,
    icon: ICONS.account,
    allowForUser: 'NOT_CONFIRMED',
  },
  {
    label: 'Вийти',
    href: RoutesMap.ACCOUNT.LOGOUT,
    icon: ICONS.logout,
    allowForUser: 'NOT_CONFIRMED',
    forTg: false,
  },
  {
    label: 'Месенджер',
    href: RoutesMap.ACCOUNT.MESSENGER,
    icon: ICONS.telegram,
    allowForUser: 'LOGGEDIN',
    forTg: false,
  },
  {
    label: 'Запити на вхід',
    href: RoutesMap.ACCOUNT.WAIT.INDEX,
    icon: ICONS.home,
    allowForUser: 'LOGGEDIN',
    forTg: false,
  },
  {
    label: 'Палітра',
    href: RoutesMap.PALETTE,
    icon: ICONS.dev,
    allowForUser: 'DEV',
  },
  {
    label: 'Шаблон email',
    href: RoutesMap.MAIL,
    icon: ICONS.dev,
    allowForUser: 'DEV',
  },
];

export const MENU_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Створити спільноту',
    href: RoutesMap.NET.CREATE,
    icon: ICONS.create,
    allowForUser: ['LOGGEDIN'],
  },
];

export const MENU_INSIDE_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Goal',
    href: RoutesMap.NET.NET_ID.GOAL,
    icon: ICONS.account,
    allowForUser: 'INVITING',
  },
  {
    label: 'Інфо',
    href: RoutesMap.NET.NET_ID.INFO,
    icon: ICONS.about,
    allowForUser: ['INSIDE_NET'],
  },
  {
    label: 'Board',
    href: RoutesMap.NET.NET_ID.BOARD,
    icon: ICONS.board,
    allowForUser: ['INSIDE_NET'],
  },
  {
    label: 'Створити спільноту',
    href: RoutesMap.NET.NET_ID.CREATE,
    icon: ICONS.create,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Покинути назавжди',
    href: RoutesMap.NET.NET_ID.LEAVE,
    icon: ICONS.remove,
    allowForUser: 'INVITING',
  },
  {
    label: 'Чат',
    href: RoutesMap.NET.NET_ID.CHAT,
    icon: ICONS.post,
    allowForUser: ['INSIDE_NET'],
  },
];

export const MENU_TREE_ITEMS: IMenuItem[] = [
  {
    label: 'Запити на вхід до спільноти',
    href: RoutesMap.NET.NET_ID.TREE.WAITING,
    icon: ICONS.account,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Інфо',
    href: RoutesMap.NET.NET_ID.TREE.INFO,
    icon: ICONS.about,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Чат',
    href: RoutesMap.NET.NET_ID.TREE.CHAT,
    icon: ICONS.post,
    allowForUser: 'INSIDE_NET',
  },
];

export const MENU_CIRCLE_ITEMS: IMenuItem[] = [
  {
    label: 'Інфо',
    href: RoutesMap.NET.NET_ID.CIRCLE.INFO,
    icon: ICONS.about,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Чат',
    href: RoutesMap.NET.NET_ID.CIRCLE.CHAT,
    icon: ICONS.post,
    allowForUser: 'INSIDE_NET',
  },
];

export const MENU_BOARD_ITEMS: IMenuItem[] = [
  {
    label: '',
    href: '',
    icon: ICONS.message,
    allowForUser: 'INSIDE_NET',
  },
];
