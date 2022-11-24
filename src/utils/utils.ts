import { IUserResponse } from '@api/api/types/account.types';
import { INetResponse, INetsResponse } from '@api/api/types/net.types';
import { IMenuItem } from '@components/menu/types';
import { UserStateKeys, USER_STATE_MAP } from '@api/constants';
import { RoutesMap } from '@constants/router.constants';
import { IS_DEV } from '@constants/constants';
import { ICONS } from '@components/icon/icon';

const { NET_NUMBER } = RoutesMap.NET;

export const format = (str: string, ...values: string[]) => {
  return values.reduce((result, value) => result.replace('%s', value), str);
};

export const makeDynamicPathname = (pathname: string, id: number | string) =>
  pathname.replace(/:[^/]+/, id.toString());

const netMenuFilter = (netMeuItem: IMenuItem, userState: UserStateKeys) => {
  const { allowForUser } = netMeuItem;
  if (Array.isArray(allowForUser)) return allowForUser.includes(userState!);
  if (USER_STATE_MAP[allowForUser] <= USER_STATE_MAP[userState!]) return true;
  if (IS_DEV && allowForUser === 'DEV') return true;
  return false;
};

export const getNetMenuItems = (
  menuItems: IMenuItem[],
  user: IUserResponse,
  net?: INetResponse,
) => {
  const { user_state: userState = 'NOT_LOGGEDIN' } = user || {};
  const netId = net?.net_id.toString();
  let filteredMenuItems = menuItems.filter((item) => netMenuFilter(item, userState));
  filteredMenuItems = !netId
    ? filteredMenuItems
    : filteredMenuItems.map((item) => {
        const pathname = item.pathname.replace(':net_id', netId);
        return { ...item, pathname };
      });
  return filteredMenuItems.length ? filteredMenuItems : undefined;
};

export const createNetMenuItems = (nets: INetsResponse, user: IUserResponse, icon?: ICONS) => {
  const netMenuItems = nets.map(
    ({ net_id, name }): IMenuItem => ({
      label: name,
      pathname: makeDynamicPathname(NET_NUMBER.INDEX, net_id),
      icon: icon || ICONS.home,
      allowForUser: 'LOGGEDIN',
    }),
  );
  return getNetMenuItems(netMenuItems, user);
};
