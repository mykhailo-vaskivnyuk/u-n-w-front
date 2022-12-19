import { useMatch } from 'react-router-dom';
import { IUserResponse } from '@api/api/types/account.types';
import {
  INetResponse,
  INetsResponse,
  NetViewKeys,
  IMemberResponse,
} from '@api/api/types/net.types';
import { IMenuItem } from '@components/menu/types';
import { UserStateKeys, USER_STATE_MAP } from '@api/constants';
import { RoutesMap } from '@constants/router.constants';
import { IS_DEV } from '@constants/constants';
import { ICONS } from '@components/icon/icon';

const { NET_ID } = RoutesMap.NET;

export const format = (str: string, ...values: string[]) => {
  return values.reduce((result, value) => result.replace('%s', value), str);
};

export const makeDynamicPathname = (pathname: string, ...ids: (number | string)[]) =>
  ids.reduce((result: string, id) => result.replace(/:[^/]+/, id.toString()), pathname);

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
      pathname: makeDynamicPathname(NET_ID.INDEX, net_id),
      icon: icon || ICONS.home,
      allowForUser: 'LOGGEDIN',
    }),
  );
  return getNetMenuItems(netMenuItems, user);
};

export const useMatchParam = (paramName: string, path: string, end: boolean = true) => {
  const { params } = useMatch<typeof paramName, typeof path>({ path, end }) || {};
  const { [paramName]: strParamValue } = params || {};
  return Number(strParamValue) || strParamValue || '';
};

export const getMemberName = (
  netView: NetViewKeys,
  member: IMemberResponse,
  memberPosition: number,
) => {
  const position = netView === 'tree' ? memberPosition + 1 : memberPosition && memberPosition + 1;
  const { name, member_name: memberName } = member;
  return name || memberName || `member ${position}`;
};
