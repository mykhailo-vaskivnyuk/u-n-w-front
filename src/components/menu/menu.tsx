import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { IMenuItem } from './types';
import { MenuItem } from './menu.item';
import { useStyles } from './menu.styles';

export interface MenuProps {
  parentItems?: IMenuItem[];
  siblingItems?: IMenuItem[];
  childItems?: IMenuItem[];
  items?: IMenuItem[];
}

export const Menu: FC<MenuProps> = (props) => {
  const { root, section } = useStyles();
  const { parentItems, siblingItems, childItems, items } = props;
  const location = useLocation();

  const handleClick = useCallback(() => modalService.closeModal(), []);

  const getMenuItemsJsx = useCallback(
    (menuItemsProps?: IMenuItem[]) =>
      menuItemsProps &&
      menuItemsProps.map((item) => {
        const active = item.pathname === location.pathname;
        return <MenuItem key={item.pathname} {...item} onClick={handleClick} active={active} />;
      }),
    [handleClick, location.pathname],
  );

  const itemsJsx = getMenuItemsJsx(items);
  const parentItemsJsx = getMenuItemsJsx(parentItems);
  const siblingItemsJsx = getMenuItemsJsx(siblingItems);
  const childItemsJsx = getMenuItemsJsx(childItems);

  return (
    <div className={root}>
      {parentItemsJsx && <ul className={section}>{parentItemsJsx}</ul>}
      {siblingItemsJsx && <ul className={section}>{siblingItemsJsx}</ul>}
      {childItemsJsx && <ul className={section}>{childItemsJsx}</ul>}
      <ul className={section}>{itemsJsx}</ul>
    </div>
  );
};
