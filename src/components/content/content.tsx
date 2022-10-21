import React, { FC } from 'react';
// import { AuthForm } from '@components/forms/auth/auth';
import { Router } from './content.router';
import { useStyles } from './content.styles';

export const Content: FC = () => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <Router />
    </div>
  );
};
