import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@hooks/useUser';
import { RoutesMap } from '@components/app/router';
import { AppState } from '@api/constants';
import { useAppState } from '@hooks/useAppState';

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const state = useAppState();
  const user = useUser();

  useEffect(() => {
    if (state === AppState.INIT) return;
    switch (pathname) {
      case RoutesMap.INDEX:
        !user && navigate(RoutesMap.ACCOUNT.LOGIN.full);
        break;
      default:
    }
  }, [navigate, pathname, state, user]);

  return null;
};
