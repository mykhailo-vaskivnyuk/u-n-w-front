import { IUserResponse } from '@api/api/types/account.types';
import { IMenuItem } from '@components/menu/types';
import { USER_STATE_MAP } from '@api/constants';
import { RelativeRoutesMap } from '@constants/router.constants';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const format = (str: string, ...values: string[]) => {
  return values.reduce((result, value) => result.replace('%s', value), str);
};

export const getMenuItemsForUser = (menuItems: IMenuItem[], user: IUserResponse) => {
  let { user_state: userState } = user || {};
  if (!userState) userState = 'NOT_LOGGEDIN';
  const filteredMenuItems = menuItems.filter(({ allowForUser }) => {
    if (Array.isArray(allowForUser)) return allowForUser.includes(userState!);
    return (
      USER_STATE_MAP[allowForUser] <= USER_STATE_MAP[userState!] ||
      (IS_DEV && allowForUser === 'DEV')
    );
  });
  return filteredMenuItems.length ? filteredMenuItems : undefined;
};

export const makeDynamicPathname = (pathname: string, id: number | string) =>
  pathname.replace('*', id.toString());

export const getAppStateFromHash = () => {
  const names = window.location.hash
    .replace('#', '')
    .split('/')
    .filter((path) => Boolean(path));
  if (names.shift() !== RelativeRoutesMap.USER.INDEX) return {};
  const netPathname = makeDynamicPathname(RelativeRoutesMap.USER.NET, '').replace('/', '');
  if (names.shift() !== netPathname) return {};
  const netId = Number.parseInt(names.shift() || '', 10);
  if (!netId) return {};
  return { net_id: netId };
};
