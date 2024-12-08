import { RoutesMap } from '@constants/router.constants';
import { IMenuItem } from '@components/menu/types';

export const MENU_ITEMS: IMenuItem[] = [
  {
    label: 'Про You & World',
    href: RoutesMap.ABOUT,
    icon: 'about',
    allowForUser: 'NOT_LOGGEDIN',
  },
  {
    label: 'Авторизуватись',
    href: RoutesMap.ACCOUNT.LOGIN,
    icon: 'login',
    allowForUser: ['NOT_LOGGEDIN'],
  },
  {
    label: 'Акаунт',
    href: RoutesMap.ACCOUNT.INDEX,
    icon: 'account',
    allowForUser: 'NOT_CONFIRMED',
  },
  {
    label: 'Вийти',
    href: RoutesMap.ACCOUNT.LOGOUT,
    icon: 'logout',
    allowForUser: 'NOT_CONFIRMED',
    forTg: false,
  },
  {
    label: 'Месенджер',
    href: RoutesMap.ACCOUNT.MESSENGER,
    icon: 'telegram',
    allowForUser: 'LOGGEDIN',
    forTg: false,
  },
  {
    label: 'Запити на вхід',
    href: RoutesMap.ACCOUNT.WAIT.INDEX,
    icon: 'home',
    allowForUser: 'LOGGEDIN',
    forTg: false,
  },
  {
    label: 'Палітра',
    href: RoutesMap.PALETTE,
    icon: 'dev',
    allowForUser: 'DEV',
  },
  {
    label: 'Шаблон email',
    href: RoutesMap.MAIL,
    icon: 'dev',
    allowForUser: 'DEV',
  },
];

export const MENU_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Створити спільноту',
    href: RoutesMap.NET.CREATE,
    icon: 'create',
    allowForUser: ['LOGGEDIN'],
  },
];

export const MENU_INSIDE_NET_ITEMS: IMenuItem[] = [
  {
    label: 'Goal',
    href: RoutesMap.NET.NET_ID.GOAL,
    icon: 'account',
    allowForUser: 'INVITING',
  },
  {
    label: 'Правила',
    href: RoutesMap.NET.NET_ID.RULES,
    icon: 'dev',
    allowForUser: 'INVITING',
  },
  {
    label: 'Інфо',
    href: RoutesMap.NET.NET_ID.INFO,
    icon: 'about',
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Board',
    href: RoutesMap.NET.NET_ID.BOARD,
    icon: 'board',
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Створити спільноту',
    href: RoutesMap.NET.NET_ID.CREATE,
    icon: 'create',
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Покинути назавжди',
    href: RoutesMap.NET.NET_ID.LEAVE,
    icon: 'remove',
    allowForUser: 'INVITING',
  },
  {
    label: 'Чат',
    href: RoutesMap.NET.NET_ID.CHAT,
    icon: 'post',
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Запити на вхід до спільноти',
    href: RoutesMap.NET.NET_ID.WAITING,
    icon: 'wait',
    allowForUser: 'INSIDE_NET',
  },
];

export const MENU_TREE_ITEMS: IMenuItem[] = [
  {
    label: 'Інфо',
    href: RoutesMap.NET.NET_ID.TREE.INFO,
    icon: 'about',
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Чат',
    href: RoutesMap.NET.NET_ID.TREE.CHAT,
    icon: 'post',
    allowForUser: 'INSIDE_NET',
  },
];

export const MENU_CIRCLE_ITEMS: IMenuItem[] = [
  {
    label: 'Інфо',
    href: RoutesMap.NET.NET_ID.CIRCLE.INFO,
    icon: 'about',
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Чат',
    href: RoutesMap.NET.NET_ID.CIRCLE.CHAT,
    icon: 'post',
    allowForUser: 'INSIDE_NET',
  },
];

export const MENU_BOARD_ITEMS: IMenuItem[] = [
  {
    label: '',
    href: '',
    icon: 'message',
    allowForUser: 'INSIDE_NET',
  },
];
