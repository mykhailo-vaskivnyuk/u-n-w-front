import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '@api/constants';
import { useAppState } from '@hooks/useAppState';
import { useUser } from '@hooks/useUser';
import { RoutesMap } from '@components/router/constants';

const endingOnSlash = /\/$/;

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const state = useAppState();
  const user = useUser();

  useEffect(() => {
    if (state === AppState.INIT) return;
    if (pathname !== RoutesMap.INDEX && endingOnSlash.test(pathname)) {
      return navigate(pathname.replace(endingOnSlash, ''));
    }
    switch (pathname) {
      case RoutesMap.INDEX:
      case RoutesMap.ACCOUNT.INDEX:
        !user && navigate(RoutesMap.ACCOUNT.LOGIN);
        break;
      case RoutesMap.ACCOUNT.SIGNUP:
      case RoutesMap.ACCOUNT.LOGIN:
      case RoutesMap.ACCOUNT.OVERMAIL:
        user && navigate(RoutesMap.INDEX);
        break;
      default:
    }
  }, [navigate, pathname, state, user]);

  return null;
};
