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

export const getNetEvents = () => {
  const { nets, net, events } = app.getState();
  const { childNets, siblingNets, parentNets } = nets;
  const childEvents = childNets.map(({ net_id }) => {
    const netEvents = events.get(net_id)!;
    return netEvents.getAllCount();
  });
  const siblingEvents = siblingNets.map(({ net_id }) => {
    const netEvents = events.get(net_id)!;
    if (net_id === net?.net_id) return netEvents.getCount();
    return netEvents.getAllCount();
  });
  const parentEvents = parentNets.map(({ net_id }, i, arr) => {
    const netEvents = events.get(net_id)!;
    if (i === arr.length - 1) return netEvents.getCount();
    const childNetId = arr[i + 1].net_id;
    const childrenEvents = events.get(childNetId)!;
    return netEvents.getAllCount() - childrenEvents.getAllCount();
  });
  return { childEvents, siblingEvents, parentEvents };
};

export const createNetMenuItems = (nets: T.INetsResponse, events: number[], icon?: ICONS) => {
  const netMenuItems = nets.map(({ net_id, name }, i): IMenuItem => {
    return {
      label: name,
      href: makeDynamicPathname(NET_ID.INDEX, net_id),
      end: false,
      icon: icon || ICONS.home,
      allowForUser: 'LOGGEDIN',
      notification: Boolean(events[i]),
    };
  });
  return getMenuItems(netMenuItems);
};
