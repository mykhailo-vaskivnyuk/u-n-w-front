import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { modalService } from '@services/modal.service';
import { Icon, ICONS } from '@components/icon/icon';
import { IMenuItem } from '../types';
import { NetMenuItem } from './net.menu.item';
import { useStyles } from './net.menu.styles';

export interface NetMenuProps {
  items?: IMenuItem[];
  className: string;
}

export const NetMenu: FC<NetMenuProps> = (props) => {
  const { root, section } = useStyles();
  const { items, className } = props;
  const location = useLocation();

  const handleClick = useCallback(() => modalService.closeModal(), []);

  const getMenuItemsJsx = useCallback(
    (menuItemsProps?: IMenuItem[]) =>
      menuItemsProps &&
      menuItemsProps.map((item) => {
        const active = item.pathname === location.pathname;
        return <NetMenuItem key={item.pathname} {...item} onClick={handleClick} active={active} />;
      }),
    [handleClick, location.pathname],
  );

  const itemsJsx = [<Icon key="key" icon={ICONS.account} />]; // getMenuItemsJsx(items);

  return (
    <div className={clsx(root, className)}>
      <ul className={clsx(section)}>{itemsJsx}</ul>
    </div>
  );
};
