import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Icon } from '@components/icon/icon';
import { MenuItemProps } from '../types';
import { useStyles } from './net.menu.item.styles';

export const NetMenuItem: FC<MenuItemProps> = (props) => {
  const { root, link } = useStyles();
  const { label, pathname, icon, onClick, active } = props;
  return (
    <li className={root}>
      <Link to={pathname} className={clsx(link, { active })} onClick={onClick}>
        <Icon icon={icon} />
        {label}
      </Link>
    </li>
  );
};