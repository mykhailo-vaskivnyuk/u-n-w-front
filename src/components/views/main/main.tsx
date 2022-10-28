import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@hooks/useUser';
import { RoutesMap } from '@components/app/router';
import { AppState } from '@api/constants';
import { useAppState } from '@hooks/useAppState';
import { useStyles } from './main.styles';

export const Main: FC = () => {
  const { root, content } = useStyles();
  const user = useUser();
  const state = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    state !== AppState.INIT && !user && navigate(RoutesMap.ACCOUNT.LOGIN.full);
  }, [navigate, state, user]);

  return (
    <div className={root}>
      <div className={content}>START PAGE</div>
      {user && <div className={content}>{user.name || user.net_name || user.email}</div>}
    </div>
  );
};
