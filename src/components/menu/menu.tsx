import { modalService } from '@services/modal.service';
import React, { FC, useCallback } from 'react';
import { MenuItem, MenuItemProps } from './menu.item';
import { useStyles } from './menu.styles';

export interface MenuProps {
  items: Omit<MenuItemProps, 'onClick'>[];
}

export const Menu: FC<MenuProps> = (props) => {
  const { root } = useStyles();
  const { items } = props;

  const handleClick = useCallback(() => modalService.closeModal(), []);

  const itemsJsx = items.map((itemProps) => (
    <MenuItem key={itemProps.id} {...itemProps} onClick={handleClick} />
  ));
  return <ul className={root}>{itemsJsx}</ul>;
};
