import React, { FC } from 'react';
import clsx from 'clsx';
import { modalService } from '@services/modal.service';
import { useCombineStyles } from '@styles/hooks/useCombineStyles';
import { IMenuItem } from './types';
import { MenuItem } from './menu.item/menu.item';
import { useStyles } from './menu.styles';

export interface MenuProps {
  parentItems?: IMenuItem[];
  siblingItems?: IMenuItem[];
  childItems?: IMenuItem[];
  items?: IMenuItem[];
  classes?: Partial<ReturnType<typeof useStyles>>;
}

const handleClick = modalService.closeModal;

const getMenuItemsJsx = (menuItems?: IMenuItem[]) =>
  menuItems &&
  menuItems.map((item) => {
    return <MenuItem key={item.href} {...item} onClick={handleClick} />;
  });

export const Menu: FC<MenuProps> = (props) => {
  const { parentItems, siblingItems, childItems, items, classes } = props;
  const { root, section, parentItems: clsParentItems } = useCombineStyles(useStyles(), classes);

  const itemsJsx = getMenuItemsJsx(items);
  const parentItemsJsx = getMenuItemsJsx(parentItems);
  const siblingItemsJsx = getMenuItemsJsx(siblingItems);
  const childItemsJsx = getMenuItemsJsx(childItems);

  return (
    <div className={root}>
      {itemsJsx && <ul className={section}>{itemsJsx}</ul>}
      {parentItemsJsx && <ul className={clsx(section, clsParentItems)}>{parentItemsJsx}</ul>}
      {siblingItemsJsx && <ul className={section}>{siblingItemsJsx}</ul>}
      {childItemsJsx && <ul className={section}>{childItemsJsx}</ul>}
    </div>
  );
};
