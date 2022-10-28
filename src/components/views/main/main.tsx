import React, { FC } from 'react';
import { useUser } from '@hooks/useUser';
import { useStyles } from './main.styles';

export const Main: FC = () => {
  const { root, content } = useStyles();
  const user = useUser();

  return (
    <div className={root}>
      <div className={content}>START PAGE</div>
      {user && <div className={content}>{user.name || user.net_name || user.email}</div>}
    </div>
  );
};
