import React, { FC } from 'react';
import { app } from '@api/client.app';
import { useStyles } from './main.styles';

export const Main: FC = () => {
  const { root, content } = useStyles();
  const user = app.getUser();

  return (
    <div className={root}>
      <div className={content}>START PAGE</div>
      {user && <div className={content}>HELLO, {user.name}!</div>}
      {/* {user && <pre>{JSON.stringify(user, null, ' ')}</pre>} */}
    </div>
  );
};
