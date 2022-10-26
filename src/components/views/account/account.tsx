import React, { FC } from 'react';
import { app } from '@api/client.app';
import { useStyles } from './account.styles';

export const Account: FC = () => {
  const { root, content } = useStyles();
  const user = app.getUser();

  return (
    <div className={root}>
      <div className={content}>ACCOUNT</div>
      {user && <pre>{JSON.stringify(user, null, ' ')}</pre>}
    </div>
  );
};
