import React, { FC, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { modalService } from '@services/modal.service';
import {
  MENU_ITEMS,
  MENU_PARENT_NET_ITEMS,
  MENU_SIBLING_NET_ITEMS,
  MENU_CHILD_NET_ITEMS,
  MENU_NET_ITEMS,
} from '@constants/constants';
import { useUser } from '@hooks/useUser';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useStyles } from './header.styles';
import { MenuTypes } from '../menu/types';

const isDEV = process.env.NODE_ENV === 'development';

export const Header: FC = () => {
  const { root, title, button, hidden } = useStyles();
  const user = useUser();
  const menuType: typeof MenuTypes[number] = user ? 'logedIn' : 'notLogedIn';
  // console.log('MENU TYPE', menuType);
  const menuItems = MENU_ITEMS.filter(
    ({ menu }) => menu.includes(menuType) || (isDEV && menu.includes('dev')),
  );
  const openMenu = useCallback(() => modalService.openMenu({ items: menuItems }), [menuItems]);

  const menuNetItems = useMemo(() => {
    // console.log('MENU TYPE', menuType);
    const items = MENU_NET_ITEMS.filter(({ menu }) => menu.includes(menuType));
    // console.log(user, MENU_NET_ITEMS, menuType, items);
    if (!items.length) return null;
    return {
      // parentItems: MENU_PARENT_NET_ITEMS,
      // siblingItems: MENU_SIBLING_NET_ITEMS,
      // childItems: MENU_CHILD_NET_ITEMS,
      items,
    };
  }, [menuType]);

  const openNetMenu = useCallback(
    () => menuNetItems && modalService.openMenu(menuNetItems),
    [menuNetItems],
  );

  return (
    <div className={root}>
      <IconButton icon={ICONS.menu} onClick={openMenu} className={button} />
      <div className={title}>НЕ В СПІЛЬНОТІ</div>
      <IconButton
        icon={ICONS.menu_nets}
        onClick={openNetMenu}
        className={clsx(button, { [hidden]: !menuNetItems })}
      />
    </div>
  );
};
