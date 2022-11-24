import { useCallback, useMemo } from 'react';
import { MENU_ITEMS, MENU_NET_ITEMS } from '@constants/menu.constants';
import { RoutesMap } from '@constants/router.constants';
import { ROOT_TITLE } from '@constants/constants';
import { getNetMenuItems, createNetMenuItems, makeDynamicPathname } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';

export const useMenuItems = () => {
  const user = useUser();
  const [net, nets] = useNet();
  const { name = ROOT_TITLE, net_id: netId } = net || {};

  const menuItems = useMemo(() => getNetMenuItems(MENU_ITEMS, user), [user]);

  const menuNetItems = useMemo(() => {
    const { parentNets, siblingNets, childNets } = nets;
    const items = getNetMenuItems(MENU_NET_ITEMS, user, net);
    const parentItems = createNetMenuItems(parentNets, user);
    const siblingItems = createNetMenuItems(siblingNets, user);
    const childItems = createNetMenuItems(childNets, user);
    if (!items) return undefined;
    return { parentItems, siblingItems, childItems, items };
  }, [net, nets, user]);

  const href = useMemo(
    () =>
      netId ? makeDynamicPathname(RoutesMap.USER.NET.NET_NUMBER.INDEX, netId!) : RoutesMap.ROOT,
    [netId],
  );

  const openMenu = useCallback(() => modalService.openMenu({ items: menuItems }), [menuItems]);
  const openNetMenu = useCallback(
    () => menuNetItems && modalService.openMenu(menuNetItems),
    [menuNetItems],
  );

  return { name, href, openMenu, openNetMenu: menuNetItems && openNetMenu };
};
