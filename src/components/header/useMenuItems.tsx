import { useCallback, useMemo } from 'react';
import { IMenuItem } from '@components/menu/types';
import { MENU_ITEMS, MENU_NET_ITEMS } from '@constants/menu.constants';
import { RoutesMap } from '@constants/router.constants';
import { ICONS } from '@components/icon/icon';
import { modalService } from '@services/modal.service';
import { getMenuItemsForUser } from '@utils/utils';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';

export const useMenuItems = () => {
  const user = useUser();
  const [net, nets] = useNet();
  const menuItems = getMenuItemsForUser(MENU_ITEMS, user);

  const menuParentNetItems = nets
    .filter(({ net_id }) => net_id !== net?.net_id)
    .map(
      ({ net_id, name }): IMenuItem => ({
        label: name,
        pathname: RoutesMap.NET.ENTER.replace('*', `${net_id}`),
        icon: ICONS.home,
        allowForUser: 'INSIDE_NET',
      }),
    );

  const menuNetItems = useMemo(() => {
    const items = getMenuItemsForUser(MENU_NET_ITEMS, user);
    const parentItems = getMenuItemsForUser(menuParentNetItems, user);
    return { parentItems, items };
  }, [menuParentNetItems, user]);

  const name = net?.name || 'НЕ В СПІЛЬНОТІ';
  const openMenu = useCallback(() => modalService.openMenu({ items: menuItems }), [menuItems]);
  const openNetMenu = useCallback(
    () => menuNetItems && modalService.openMenu(menuNetItems),
    [menuNetItems],
  );

  return { name, openMenu, openNetMenu: menuNetItems ? openNetMenu : undefined };
};
