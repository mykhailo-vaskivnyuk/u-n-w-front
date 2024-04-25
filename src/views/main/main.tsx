import React, { FC } from 'react';
import { useMenuItems } from '@hooks/useMenuItems';
import { Menu } from '@components/menu/menu';
import { app } from '@app/common/client/app';
import { MainNotConfirmed } from './main.not.confirmed';
import { useStyles } from './main.styles';

export const Main: FC = () => {
  const { root, menuRoot } = useStyles();
  const { netMenuItems } = useMenuItems();
  const classes = { root: menuRoot };

  const { user_status: userStatus } = app.getState().user || {};
  const notConfirmed = userStatus === 'NOT_CONFIRMED';
  if (notConfirmed) return <MainNotConfirmed />;

  return (
    <div className={root}>
      <Menu {...netMenuItems} classes={classes} />
    </div>
  );
};
