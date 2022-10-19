import { Auth } from '@components/auth/auth';
import { Members } from '@components/views/members/members';
import React, { FC } from 'react';
import { useStyles } from './main.styles';

export const Main: FC = () => {
  const { root } = useStyles();

  return (
    <div className={root}>
      {/* <Members /> */}
      <Auth />
    </div>
  );
};
