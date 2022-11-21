import { useCallback, useMemo } from 'react';
import { IMenuItem } from '@components/menu/types';
import { MENU_ITEMS, MENU_NET_ITEMS } from '@constants/menu.constants';
import { RoutesMap } from '@constants/router.constants';
import { ROOT_TITLE } from '@constants/constants';
import { ICONS } from '@components/icon/icon';
import { modalService } from '@services/modal.service';
import { getMenuItemsForUser, makeDynamicPathname } from '@utils/utils';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';

export const useMenuItems = () => {
  const user = useUser();
  const [net, nets] = useNet();
  const menuItems = getMenuItemsForUser(MENU_ITEMS, user);

  // const {
  //   parent_nets: parentNets = [],
  //   sibling_nets: siblingNets = [],
  //   child_nets: childNets = [],
  // } = nets;

  // const menuParentNetItems = useMemo(
  //   () =>
  //     parentNets
  //       .filter(({ net_id }) => net_id !== net?.net_id)
  //       .map(
  //         ({ net_id, name }): IMenuItem => ({
  //           label: name,
  //           pathname: makeDynamicPathname(RoutesMap.NET.ENTER, net_id),
  //           icon: ICONS.home,
  //           allowForUser: 'LOGGEDIN',
  //         }),
  //       ),
  //   [net, nets],
  // );

  // const menuSiblingNetItems = useMemo(
  //   () =>
  //     siblingNets
  //       .filter(({ net_id }) => net_id !== net?.net_id)
  //       .map(
  //         ({ net_id, name }): IMenuItem => ({
  //           label: name,
  //           pathname: makeDynamicPathname(RoutesMap.NET.ENTER, net_id),
  //           icon: ICONS.home,
  //           allowForUser: 'LOGGEDIN',
  //         }),
  //       ),
  //   [net, nets],
  // );

  // const menuChildNetItems = useMemo(
  //   () =>
  //     childNets
  //       .filter(({ net_id }) => net_id !== net?.net_id)
  //       .map(
  //         ({ net_id, name }): IMenuItem => ({
  //           label: name,
  //           pathname: makeDynamicPathname(RoutesMap.NET.ENTER, net_id),
  //           icon: ICONS.home,
  //           allowForUser: 'LOGGEDIN',
  //         }),
  //       ),
  //   [net, nets],
  // );

  const menuNetItems = useMemo(() => {
    const items = getMenuItemsForUser(MENU_NET_ITEMS, user);
    // const parentItems = getMenuItemsForUser(menuParentNetItems, user);
    if (!items) return undefined;
    return { parentItems: [], items };
  }, [user]);

  const { name = ROOT_TITLE, net_id: netId } = net || {};
  const href = net ? makeDynamicPathname(RoutesMap.USER.NET, netId!) : RoutesMap.ROOT;

  const openMenu = useCallback(() => modalService.openMenu({ items: menuItems }), [menuItems]);
  const openNetMenu = useCallback(
    () => menuNetItems && modalService.openMenu(menuNetItems),
    [menuNetItems],
  );

  return { name, href, openMenu, openNetMenu: menuNetItems && openNetMenu };
};
