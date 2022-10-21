import React, { FC } from 'react';
import { MenuItem, MenuItemProps } from './menu.item';
import { useStyles } from './menu.styles';

export interface MenuProps {
  items: Omit<MenuItemProps, 'onClick'>[];
  onSelect: () => void;
}

export const Menu: FC<MenuProps> = (props) => {
  const { root } = useStyles();
  const { items, onSelect } = props;
  const itemsJsx = items.map((itemProps) => (
    <MenuItem key={itemProps.id} {...itemProps} onClick={onSelect} />
  ));
  return <ul className={root}>{itemsJsx}</ul>;
};
