import { RoutesMap } from '@constants/router.constants';
import { IMenuItem } from '@components/menu/types';
import { ICONS } from '@components/icon/icon';

export const MENU_ITEMS: IMenuItem[] = [
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
    label: 'Акаунт',
    pathname: RoutesMap.ACCOUNT.INDEX,
    icon: ICONS.spinner,
    allowForUser: 'NOT_CONFIRMED',
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
    label: 'Створити спільноту',
    pathname: `${RoutesMap.NET.INDEX}/:net_id/create`,
    icon: ICONS.spinner,
    allowForUser: ['LOGGEDIN'],
  },
  {
    label: 'Створити спільноту',
    pathname: `${RoutesMap.NET.INDEX}/:net_id/create`,
    icon: ICONS.spinner,
    allowForUser: 'INSIDE_NET',
  },
  {
    label: 'Покинути назавжди',
    pathname: RoutesMap.NET.LEAVE,
    icon: ICONS.spinner,
    allowForUser: 'INSIDE_NET',
  },
];
