import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { IMenuItem } from './types';
import { MenuItem } from './menu.item';
import { useStyles } from './menu.styles';

export interface MenuProps {
  items: IMenuItem[];
}

export const Menu: FC<MenuProps> = (props) => {
  const { root } = useStyles();
  const { items } = props;
  const location = useLocation();

  const handleClick = useCallback(() => modalService.closeModal(), []);

  const itemsJsx = items.map((itemProps) => {
    const active = itemProps.pathname === location.pathname;
    return (
      <MenuItem key={itemProps.pathname} {...itemProps} onClick={handleClick} active={active} />
    );
  });
  return <ul className={root}>{itemsJsx}</ul>;
};
