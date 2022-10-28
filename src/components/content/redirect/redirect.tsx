import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@hooks/useUser';
import { RoutesMap } from '@components/app/router';
import { AppState } from '@api/constants';
import { useAppState } from '@hooks/useAppState';

const endingOnSlash = /\/$/;

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const state = useAppState();
  const user = useUser();

  useEffect(() => {
    if (pathname !== RoutesMap.INDEX && endingOnSlash.test(pathname)) {
      navigate(pathname.replace(endingOnSlash, ''));
    }
    if (state === AppState.INIT) return;
    switch (pathname) {
      case RoutesMap.INDEX:
      case RoutesMap.ACCOUNT.INDEX.full:
        !user && navigate(RoutesMap.ACCOUNT.LOGIN.full);
        break;
      case RoutesMap.ACCOUNT.SIGNUP.full:
      case RoutesMap.ACCOUNT.LOGIN.full:
      case RoutesMap.ACCOUNT.OVERMAIL.full:
        user && navigate(RoutesMap.INDEX);
        break;
        // case RoutesMap.ACCOUNT.LOGOUT.full:
        //   break;
        // case RoutesMap.ACCOUNT.CONFIRM.full:
        //   break;
        // case RoutesMap.ACCOUNT.RESTORE.full:
        break;
      default:
    }
  }, [navigate, pathname, state, user]);

  return null;
};
