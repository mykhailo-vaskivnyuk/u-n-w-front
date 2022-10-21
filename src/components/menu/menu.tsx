import React, { FC } from 'react';
import { MenuItem, MenuItemProps } from './menu.item';
import { useStyles } from './menu.styles';

export interface MenuProps {
  items: MenuItemProps[];
}

export const Menu: FC<MenuProps> = (props) => {
  const { root } = useStyles();
  const { items } = props;
  const itemsJsx = items.map((itemProps) => <MenuItem {...itemProps} />);
  return <ul className={root}>{itemsJsx}</ul>;
};
