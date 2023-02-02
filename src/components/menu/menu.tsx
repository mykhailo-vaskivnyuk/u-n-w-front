import React, { FC } from 'react';
import clsx from 'clsx';
import { modalService } from '@services/modal.service';
import { IMenuItem } from './types';
import { MenuItem } from './menu.item/menu.item';
import { useStyles } from './menu.styles';

export interface MenuProps {
  parentItems?: IMenuItem[];
  siblingItems?: IMenuItem[];
  childItems?: IMenuItem[];
  items?: IMenuItem[];
}

const handleClick = modalService.closeModal;

const getMenuItemsJsx = (menuItems?: IMenuItem[]) =>
  menuItems &&
  menuItems.map((item) => {
    return <MenuItem key={item.href} {...item} onClick={handleClick} />;
  });

export const Menu: FC<MenuProps> = (props) => {
  const { root, section, parentItems: clsParentItems } = useStyles();
  const { parentItems, siblingItems, childItems, items } = props;

  const itemsJsx = getMenuItemsJsx(items);
  const parentItemsJsx = getMenuItemsJsx(parentItems);
  const siblingItemsJsx = getMenuItemsJsx(siblingItems);
  const childItemsJsx = getMenuItemsJsx(childItems);

  return (
    <div className={root}>
      {parentItemsJsx && <ul className={clsx(section, clsParentItems)}>{parentItemsJsx}</ul>}
      {siblingItemsJsx && <ul className={section}>{siblingItemsJsx}</ul>}
      {childItemsJsx && <ul className={section}>{childItemsJsx}</ul>}
      {itemsJsx && <ul className={section}>{itemsJsx}</ul>}
    </div>
  );
};
