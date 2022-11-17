import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '@api/constants';
import { RoutesMap } from '@constants/router.constants';
import { useAppState } from '@hooks/useAppState';
import { useUser } from '@hooks/useUser';

const endingOnSlash = /\/$/;
const isDEV = process.env.NODE_ENV === 'development';

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const state = useAppState();
  const user = useUser();

  useEffect(() => {
    if (state === AppState.INITING) return;
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
      case RoutesMap.PALETTE:
      case RoutesMap.MAIL:
        !isDEV && navigate(RoutesMap.INDEX);
        break;
      default:
    }
  }, [navigate, pathname, state, user]);

  return null;
};
