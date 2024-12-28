import React, { FC } from 'react';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { Icon } from '@components/icon/icon';
import { MenuItemProps } from '../types';
import { useStyles } from './menu.item.styles';

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { root, button, icon } = useStyles();
  const { label, notification, ...item } = props;

  return (
    <li className={root}>
      <IconButton key={item.href} className={button} {...item}>
        {label}
      </IconButton>
      {notification && <Icon icon="notification" className={icon} />}
    </li>
  );
};
