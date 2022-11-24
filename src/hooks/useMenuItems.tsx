import { useCallback, useMemo } from 'react';
import { MENU_ITEMS, MENU_NET_ITEMS } from '@constants/menu.constants';
import { RoutesMap } from '@constants/router.constants';
import { ROOT_TITLE } from '@constants/constants';
import { getNetMenuItems, createNetMenuItems, makeDynamicPathname } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';
import { USER_STATE_MAP } from '@api/constants';

const { NET_NUMBER } = RoutesMap.NET;

export const useMenuItems = () => {
  const user = useUser();
  const { user_state: userState = 'NOT_LOGGEDIN' } = user || {};
  const [net, nets] = useNet();
  const { name = ROOT_TITLE, net_id: netId } = net || {};

  const mainMenuItems = useMemo(() => getNetMenuItems(MENU_ITEMS, user), [user]);

  const menuNetItems = useMemo(() => {
    const items = getNetMenuItems(MENU_NET_ITEMS, user, net);
    const { parentNets, siblingNets, childNets } = nets;
    const parentItems = createNetMenuItems(parentNets, user);
    const siblingItems = createNetMenuItems(siblingNets, user);
    const childItems = createNetMenuItems(childNets, user);
    return { parentItems, siblingItems, childItems, items };
  }, [net, nets, user]);

  const href = useMemo(
    () => (netId ? makeDynamicPathname(NET_NUMBER.INDEX, netId!) : RoutesMap.ROOT),
    [netId],
  );

  const openMainMenu = useCallback(
    () => modalService.openMenu({ items: mainMenuItems }),
    [mainMenuItems],
  );
  const openNetMenu = useCallback(() => modalService.openMenu(menuNetItems), [menuNetItems]);

  const showMainMenu = userState !== 'INSIDE_NET' || undefined;
  const showNetMenu = USER_STATE_MAP[userState] >= USER_STATE_MAP.LOGGEDIN || undefined;

  return {
    name,
    href,
    openMainMenu: showMainMenu && openMainMenu,
    openNetMenu: showNetMenu && openNetMenu,
  };
};
