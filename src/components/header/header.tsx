import React, { FC, useCallback, useEffect, useState } from 'react';
import { modalService } from '@services/modal.service';
import { MENU_ITEMS } from '@constants/constants';
import { useUser } from '@hooks/useUser';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useStyles } from './header.styles';
import { MenuTypes } from '../menu/types';

export const Header: FC = () => {
  const { root, title, button } = useStyles();
  const user = useUser();
  const menuType: typeof MenuTypes[number] = user ? 'logedIn' : 'notLogedIn';
  const menuItems = MENU_ITEMS.filter(({ menu }) => menu.includes(menuType));
  const openMenu = useCallback(() => modalService.openMenu(menuItems), [menuItems]);

  return (
    <div className={root}>
      <IconButton icon={ICONS.menu} onClick={openMenu} className={button} />
      <div className={title}>НЕ В СПІЛЬНОТІ</div>
    </div>
  );
};
