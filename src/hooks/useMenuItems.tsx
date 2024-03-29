import { useCallback, useMemo } from 'react';
import { USER_STATUS_MAP } from '@server/types/types';
import { MENU_ITEMS, MENU_NET_ITEMS } from '@constants/menu.constants';
import { RoutesMap } from '@constants/router.constants';
import { ROOT_TITLE } from '@constants/constants';
import { getMenuItems, createNetMenuItems } from '@utils/menu.utils';
import { makeDynamicPathname } from '@utils/format.utils';
import { modalService } from '@services/modal.service';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';
import { ICONS } from '@components/icon/icon';

const { NET_ID } = RoutesMap.NET;

export const useMenuItems = () => {
  const [user, userStatus] = useUser();
  const [net, nets] = useNet();

  const { name = ROOT_TITLE, net_id: netId } = net || {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mainMenuItems = useMemo(() => getMenuItems(MENU_ITEMS), [user]);

  const netMenuItems = useMemo(() => {
    const items = getMenuItems(MENU_NET_ITEMS);
    const { parentNets, siblingNets, childNets } = nets;
    const parentItems = createNetMenuItems(parentNets, ICONS.arrowUp);
    const siblingItems = createNetMenuItems(siblingNets, ICONS.arrowRight);
    const childItems = createNetMenuItems(childNets, ICONS.arrowRight);
    return { parentItems, siblingItems, childItems, items };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nets, user]);

  const href = useMemo(
    () => (netId ? makeDynamicPathname(NET_ID.INDEX, netId!) : RoutesMap.ROOT),
    [netId],
  );

  const openMainMenu = useCallback(
    () => modalService.openMenu({ items: mainMenuItems }),
    [mainMenuItems],
  );
  const openNetMenu = useCallback(() => modalService.openMenu(netMenuItems), [netMenuItems]);

  const showMainMenu = userStatus !== 'INSIDE_NET' || undefined;
  const showNetMenu = USER_STATUS_MAP[userStatus] >= USER_STATUS_MAP.LOGGEDIN || undefined;

  return {
    name,
    href,
    netMenuItems,
    openMainMenu: showMainMenu && openMainMenu,
    openNetMenu: showNetMenu && openNetMenu,
  };
};
