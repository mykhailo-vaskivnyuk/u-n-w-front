import { Auth } from '@components/forms/auth/auth';
import React, { FC } from 'react';
import { useStyles } from './content.styles';

export const Content: FC = () => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <Auth />
    </div>
  );
};
