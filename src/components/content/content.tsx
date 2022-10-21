import React, { FC } from 'react';
import { AuthForm } from '@components/forms/auth/auth';
import { HashRouter } from 'react-router-dom';
import { useStyles } from './content.styles';

export const Content: FC = () => {
  const { root } = useStyles();

  return (
    <HashRouter>
      <div className={root}>
        <AuthForm />
      </div>
    </HashRouter>
  );
};
