import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './menu.item.styles';

export interface MenuItemProps {
  id: number;
  label: string;
  pathname: string;
  icon: ICONS;
  onClick: () => void;
}

export const MenuItem: FC<Omit<MenuItemProps, 'id'>> = (props) => {
  const { root, link, icon: clsIcon } = useStyles();
  const { label, pathname, icon } = props;

  return (
    <li className={root}>
      <Link to={pathname} className={link}>
        <Icon icon={icon} className={clsIcon} />
        {label}
      </Link>
    </li>
  );
};
