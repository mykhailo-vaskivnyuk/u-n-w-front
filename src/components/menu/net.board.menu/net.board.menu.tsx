import React, { FC } from 'react';
import { MenuItemProps } from '@components/menu/types';
import { MENU_BOARD_ITEMS } from '@constants/menu.constants';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useStyles } from '../net.submenu.styles';

interface NetBoardMenuProps {
  onFormOpen: () => void;
}

const ITEMS = MENU_BOARD_ITEMS as MenuItemProps[];

export const NetBoardMenu: FC<NetBoardMenuProps> = (props) => {
  const { root, title, section, button } = useStyles();
  const { onFormOpen } = props;
  ITEMS[0].onClick = onFormOpen;

  const itemsJsx = ITEMS.map((item) => (
    <li key={item.href}>
      <IconButton className={button} {...item} />
    </li>
  ));

  return (
    <div className={root}>
      <div className={title}>ДОШКА</div>
      <ul className={section}>{itemsJsx}</ul>
    </div>
  );
};
