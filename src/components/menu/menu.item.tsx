import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './menu.item.styles';

export interface MenuItemProps {
  label: string;
  pathname: string;
  icon: ICONS;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { root, icon: clsIcon } = useStyles();
  const { label, pathname, icon } = props;
  return (
    <li className={root}>
      <Icon icon={icon} className={clsIcon} />
      <Link to={pathname}>{label}</Link>
    </li>
  );
};
