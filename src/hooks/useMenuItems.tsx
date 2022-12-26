import { useCallback, useMemo } from 'react';
import { MENU_ITEMS, MENU_NET_ITEMS } from '@constants/menu.constants';
import { RoutesMap } from '@constants/router.constants';
import { ROOT_TITLE } from '@constants/constants';
import { getNetMenuItems, createNetMenuItems, makeDynamicPathname } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';
import { USER_STATUS_MAP } from '@api/constants';
import { ICONS } from '@components/icon/icon';

const { NET_ID } = RoutesMap.NET;

export const useMenuItems = () => {
  const user = useUser();
  const { user_status: userStatus = 'NOT_LOGGEDIN' } = user || {};
  const [net, nets] = useNet();
  const { name = ROOT_TITLE, net_id: netId } = net || {};

  const mainMenuItems = useMemo(() => getNetMenuItems(MENU_ITEMS, user), [user]);

  const menuNetItems = useMemo(() => {
    const items = getNetMenuItems(MENU_NET_ITEMS, user, net);
    const { parentNets, siblingNets, childNets } = nets;
    const parentItems = createNetMenuItems(parentNets, user, ICONS.arrowUp);
    const siblingItems = createNetMenuItems(siblingNets, user, ICONS.arrowRight);
    const childItems = createNetMenuItems(childNets, user, ICONS.arrowRight);
    return { parentItems, siblingItems, childItems, items };
  }, [net, nets, user]);

  const href = useMemo(
    () => (netId ? makeDynamicPathname(NET_ID.INDEX, netId!) : RoutesMap.ROOT),
    [netId],
  );

  const openMainMenu = useCallback(
    () => modalService.openMenu({ items: mainMenuItems }),
    [mainMenuItems],
  );
  const openNetMenu = useCallback(() => modalService.openMenu(menuNetItems), [menuNetItems]);

  const showMainMenu = userStatus !== 'INSIDE_NET' || undefined;
  const showNetMenu = USER_STATUS_MAP[userStatus] >= USER_STATUS_MAP.LOGGEDIN || undefined;

  return {
    name,
    href,
    openMainMenu: showMainMenu && openMainMenu,
    openNetMenu: showNetMenu && openNetMenu,
  };
};
