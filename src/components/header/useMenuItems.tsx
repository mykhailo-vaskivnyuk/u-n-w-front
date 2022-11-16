import { useCallback, useMemo } from 'react';
import { modalService } from '@services/modal.service';
import {
  MENU_ITEMS,
  // MENU_PARENT_NET_ITEMS,
  // MENU_SIBLING_NET_ITEMS,
  // MENU_CHILD_NET_ITEMS,
  MENU_NET_ITEMS,
} from '@constants/menu.constants';
import { useUser } from '@hooks/useUser';
import { MenuTypes } from '../menu/types';

const isDEV = process.env.NODE_ENV === 'development';

export const useMenuItems = () => {
  const user = useUser();
  const { confirmed } = user || {};
  let menuType: typeof MenuTypes[number] = user ? 'notConfirmed' : 'notLogedIn';
  user && confirmed && (menuType = 'logedIn');
  const menuItems = MENU_ITEMS.filter(
    ({ menu }) => menu.includes(menuType) || (isDEV && menu.includes('dev')),
  );

  const menuNetItems = useMemo(() => {
    const items = MENU_NET_ITEMS.filter(({ menu }) => menu.includes(menuType));
    if (!items.length) return null;
    return {
      // parentItems: MENU_PARENT_NET_ITEMS,
      // siblingItems: MENU_SIBLING_NET_ITEMS,
      // childItems: MENU_CHILD_NET_ITEMS,
      items,
    };
  }, [menuType]);

  const openMenu = useCallback(() => modalService.openMenu({ items: menuItems }), [menuItems]);
  const openNetMenu = useCallback(
    () => menuNetItems && modalService.openMenu(menuNetItems),
    [menuNetItems],
  );

  return { openMenu, openNetMenu: menuNetItems ? openNetMenu : undefined };
};
