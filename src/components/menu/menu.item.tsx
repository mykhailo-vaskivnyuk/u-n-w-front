import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@components/icon/icon';
import { MenuItemProps } from './types';
import { useStyles } from './menu.item.styles';

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { root, link, icon: clsIcon } = useStyles();
  const { label, pathname, icon, onClick } = props;

  return (
    <li className={root}>
      <Link to={pathname} className={link} onClick={onClick}>
        <Icon icon={icon} className={clsIcon} />
        {label}
      </Link>
    </li>
  );
};
