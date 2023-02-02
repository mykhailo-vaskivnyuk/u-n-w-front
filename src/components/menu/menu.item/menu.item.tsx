import React, { FC } from 'react';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { MenuItemProps } from '../types';
import { useStyles } from './menu.item.styles';

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { root, button } = useStyles();
  const { label, ...item } = props;

  return (
    <li className={root}>
      <IconButton key={item.href} className={button} {...item}>
        {label}
      </IconButton>
    </li>
  );
};
