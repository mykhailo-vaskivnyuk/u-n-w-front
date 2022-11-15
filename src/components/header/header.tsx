import React, { FC, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { modalService } from '@services/modal.service';
import {
  MENU_ITEMS,
  MENU_PARENT_NET_ITEMS,
  MENU_SIBLING_NET_ITEMS,
  MENU_CHILD_NET_ITEMS,
  MENU_NET_ITEMS,
} from '@constants/menu.constants';
import { useUser } from '@hooks/useUser';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { RoutesMap } from '@components/router/constants';
import { useStyles } from './header.styles';
import { MenuTypes } from '../menu/types';

const isDEV = process.env.NODE_ENV === 'development';

export const Header: FC = () => {
  const { root, title, button, homeButton, hidden } = useStyles();
  const user = useUser();
  const menuType: typeof MenuTypes[number] = user ? 'logedIn' : 'notLogedIn';

  const menuItems = MENU_ITEMS.filter(
    ({ menu }) => menu.includes(menuType) || (isDEV && menu.includes('dev')),
  );
  const openMenu = useCallback(() => modalService.openMenu({ items: menuItems }), [menuItems]);

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

  const openNetMenu = useCallback(
    () => menuNetItems && modalService.openMenu(menuNetItems),
    [menuNetItems],
  );

  return (
    <div className={root}>
      <IconButton icon={ICONS.menu} onClick={openMenu} className={button} />
      <div className={title}>НЕ В СПІЛЬНОТІ</div>
      <IconButton
        icon={ICONS.home}
        href={RoutesMap.INDEX}
        onClick={openNetMenu}
        className={clsx(button, homeButton)}
      />
      <IconButton
        icon={ICONS.menu_nets}
        onClick={openNetMenu}
        className={clsx(button, { [hidden]: !menuNetItems })}
      />
    </div>
  );
};
