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
    label: 'Створити спільноту',
    href: RoutesMap.NET.NET_ID.CREATE,
    icon: ICONS.create,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Покинути назавжди',
    href: RoutesMap.NET.NET_ID.LEAVE,
    icon: ICONS.remove,
    allowForUser: 'INSIDE_NET',
  },
];
