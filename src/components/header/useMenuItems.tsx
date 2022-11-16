import { useCallback, useMemo } from 'react';
import { modalService } from '@services/modal.service';
import {
  MENU_ITEMS,
  // MENU_SIBLING_NET_ITEMS,
  // MENU_CHILD_NET_ITEMS,
  MENU_NET_ITEMS,
} from '@constants/menu.constants';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';
import { RoutesMap } from '@components/router/constants';
import { ICONS } from '@components/icon/icon';

const isDEV = process.env.NODE_ENV === 'development';

export const useMenuItems = () => {
  const user = useUser();
  const [net, nets] = useNet();
  const { user_state: userState } = user || { user_state: 'NOT_LOGGEDIN' };
  const menuItems = MENU_ITEMS.filter(
    ({ userStates }) => userStates.includes(userState) || (isDEV && userStates.includes('DEV')),
  );

  const menuParentNetItems = nets
    .filter(({ net_id }) => net_id !== net?.net_id)
    .map(({ net_id, name }) => ({
      label: name,
      pathname: RoutesMap.NET.ENTER.replace('*', `${net_id}`),
      icon: ICONS.home,
      userStates: [],
    }));
  const menuNetItems = useMemo(() => {
    const items = MENU_NET_ITEMS.filter(({ userStates }) => userStates.includes(userState));
    if (!items.length) return null;
    return {
      parentItems: menuParentNetItems.length ? menuParentNetItems : undefined,
      // siblingItems: MENU_SIBLING_NET_ITEMS,
      // childItems: MENU_CHILD_NET_ITEMS,
      items,
    };
  }, [menuParentNetItems, userState]);

  const name = net?.name || 'НЕ В СПІЛЬНОТІ';
  const openMenu = useCallback(() => modalService.openMenu({ items: menuItems }), [menuItems]);
  const openNetMenu = useCallback(
    () => menuNetItems && modalService.openMenu(menuNetItems),
    [menuNetItems],
  );

  return { name, openMenu, openNetMenu: menuNetItems ? openNetMenu : undefined };
};
