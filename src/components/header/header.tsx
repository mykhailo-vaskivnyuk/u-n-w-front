import React, { FC, useCallback } from 'react';
import { modalService } from '@services/modal.service';
import { MENU_CHILD_NET_ITEMS, MENU_ITEMS, MENU_NET_ITEMS, MENU_PARENT_NET_ITEMS } from '@constants/constants';
import { useUser } from '@hooks/useUser';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useStyles } from './header.styles';
import { MenuTypes } from '../menu/types';

const isDEV = process.env.NODE_ENV === 'development';

export const Header: FC = () => {
  const { root, title, button } = useStyles();
  const user = useUser();
  const menuType: typeof MenuTypes[number] = user ? 'logedIn' : 'notLogedIn';
  const menuItems = MENU_ITEMS.filter(
    ({ menu }) => menu.includes(menuType) || (isDEV && menu.includes('dev')),
  );
  const openMenu = useCallback(() => modalService.openMenu({ items: menuItems }), [menuItems]);

  const openNetMenu = useCallback(() => {
    const menuNetItems = {
      parentItems: MENU_PARENT_NET_ITEMS,
      childItems: MENU_CHILD_NET_ITEMS,
      items: MENU_NET_ITEMS,
    };
    modalService.openMenu(menuNetItems);
  }, []);

  return (
    <div className={root}>
      <IconButton icon={ICONS.menu} onClick={openMenu} className={button} />
      <div className={title}>НЕ В СПІЛЬНОТІ</div>
      <IconButton icon={ICONS.menu_nets} onClick={openNetMenu} className={button} />
    </div>
  );
};
