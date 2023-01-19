import { useMatch } from 'react-router-dom';
import * as T from '@api/api/types/types';
import { IMenuItem } from '@components/menu/types';
import { RoutesMap } from '@constants/router.constants';
import { IS_DEV } from '@constants/constants';
import { ICONS } from '@components/icon/icon';
import { app } from '@api/app/client.app';

const { NET_ID } = RoutesMap.NET;

export const format = (str: string, ...values: string[]) => {
  return values.reduce((result, value) => result.replace('%s', value), str);
};

export const makeDynamicPathname = (pathname: string, ...ids: (number | string)[]) =>
  ids.reduce((result: string, id) => result.replace(/:[^/]+/, id.toString()), pathname);

const netMenuFilter = (netMeuItem: IMenuItem, userStatus: T.UserStatusKeys) => {
  const { allowForUser } = netMeuItem;
  if (Array.isArray(allowForUser)) return allowForUser.includes(userStatus!);
  if (T.USER_STATUS_MAP[allowForUser] <= T.USER_STATUS_MAP[userStatus!]) return true;
  if (IS_DEV && allowForUser === 'DEV') return true;
  return false;
};

export const getMenuItems = (menuItems: IMenuItem[]) => {
  const { user, net } = app.getState();
  const { user_status: userStatus = 'NOT_LOGGEDIN' } = user || {};
  const netId = net?.net_node_id.toString();
  let filteredMenuItems = menuItems.filter((item) => netMenuFilter(item, userStatus));
  filteredMenuItems = !netId
    ? filteredMenuItems
    : filteredMenuItems.map((item) => {
        const href = item.href.replace(':net_id', netId);
        return { ...item, href };
      });
  return filteredMenuItems.length ? filteredMenuItems : undefined;
};

export const createNetMenuItems = (nets: T.INetsResponse, icon?: ICONS) => {
  const netMenuItems = nets.map(
    ({ net_node_id, name }): IMenuItem => ({
      label: name,
      href: makeDynamicPathname(NET_ID.INDEX, net_node_id),
      end: false,
      icon: icon || ICONS.home,
      allowForUser: 'LOGGEDIN',
    }),
  );
  return getMenuItems(netMenuItems);
};

export const useMatchParam = (
  paramName: string,
  path: string,
  end: boolean = true,
  isNumberParam: boolean = true,
) => {
  const { params } = useMatch<typeof paramName, typeof path>({ path, end }) || {};
  const { [paramName]: strParamValue = '' } = params || {};
  return isNumberParam ? Number(strParamValue) || 0 : strParamValue;
};

export const getMemberPosition = (netView: T.NetViewKeys, memberUiPosition: number) =>
  netView === 'tree' ? memberUiPosition - 1 : memberUiPosition && memberUiPosition - 1;
