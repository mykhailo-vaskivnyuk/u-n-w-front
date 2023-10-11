import React, { FC } from 'react';
import { useMenuItems } from '@hooks/useMenuItems';
import { Menu } from '@components/menu/menu';
import { useStyles } from './main.styles';

export const Main: FC = () => {
  const { root, menuRoot } = useStyles();
  const { netMenuItems } = useMenuItems();
  const classes = { root: menuRoot };

  return (
    <div className={root}>
      <Menu {...netMenuItems} classes={classes} />
    </div>
  );
};
