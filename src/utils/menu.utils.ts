import * as T from '@server/types/types';
import { IMenuItem } from '@components/menu/types';
import { RoutesMap } from '@constants/router.constants';
import { IS_DEV } from '@constants/constants';
import { ICONS } from '@components/icon/icon';
import { app } from '@client/app';
import { makeDynamicPathname } from './format.utils';

const { NET_ID } = RoutesMap.NET;

const createNetMenuFilter = () => {
  const { userStatus, tg } = app.getState();
  return (netMeuItem: IMenuItem) => {
    const { allowForUser, forTg } = netMeuItem;
    if (!tg || forTg !== false) {
      if (Array.isArray(allowForUser)) return allowForUser.includes(userStatus);
      if (T.USER_STATUS_MAP[allowForUser] <= T.USER_STATUS_MAP[userStatus]) return true;
    }
    if (IS_DEV && allowForUser === 'DEV') return true;
    return false;
  };
};

const createInsertNetId = (netId: string) => (item: IMenuItem) => {
  const href = item.href.replace(':net_id', netId); // makeDynamicPathname ?
  return { ...item, href };
};

export const getMenuItems = (menuItems: IMenuItem[]) => {
  const netMenuFilter = createNetMenuFilter();
  let filteredMenuItems = menuItems.filter(netMenuFilter);
  const { net } = app.getState();
  if (net) {
    const netId = net?.net_id.toString();
    const insertNetId = createInsertNetId(netId);
    filteredMenuItems = filteredMenuItems.map(insertNetId);
  }
  return filteredMenuItems.length ? filteredMenuItems : undefined;
};

export const createNetMenuItems = (nets: T.INetsResponse, icon?: ICONS) => {
  const { events: eventsMap } = app.getState();
  const netMenuItems = nets.map(({ net_id, name }): IMenuItem => {
    const { state: eventsState } = eventsMap.get(net_id) || {};
    let eventsCount = eventsState?.events.length || 0;
    eventsCount += eventsState?.childEventsCount || 0;
    return {
      label: name,
      href: makeDynamicPathname(NET_ID.INDEX, net_id),
      end: false,
      icon: icon || ICONS.home,
      allowForUser: 'LOGGEDIN',
      notification: Boolean(eventsCount),
    };
  });
  return getMenuItems(netMenuItems);
};
