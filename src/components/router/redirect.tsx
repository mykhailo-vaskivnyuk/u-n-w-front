import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '@api/constants';
import { RoutesMap } from '@constants/router.constants';
import { useAppState } from '@hooks/useAppState';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';
import { app } from '@api/app/client.app';
import { IS_DEV } from '@utils/utils';

const endingOnSlash = /\/$/;

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const state = useAppState();
  const user = useUser();
  const [net] = useNet();

  useEffect(() => {
    if (state === AppState.INITING) return;
    if (pathname !== RoutesMap.ROOT && endingOnSlash.test(pathname)) {
      return navigate(pathname.replace(endingOnSlash, ''));
    }
    switch (pathname) {
      case RoutesMap.ROOT:
      case RoutesMap.ACCOUNT.INDEX:
        if (net) {
          app.netMethods.comeout().then(() => navigate(pathname));
          return;
        }
        !user && navigate(RoutesMap.ACCOUNT.LOGIN);
        break;
      case RoutesMap.ACCOUNT.SIGNUP:
      case RoutesMap.ACCOUNT.LOGIN:
      case RoutesMap.ACCOUNT.OVERMAIL:
        if (net) {
          app.netMethods.comeout().then(() => navigate(pathname));
          return;
        }
        user && navigate(RoutesMap.ROOT);
        break;
      case RoutesMap.PALETTE:
      case RoutesMap.MAIL:
        if (net) {
          app.netMethods.comeout().then(() => navigate(pathname));
          return;
        }
        !IS_DEV && navigate(RoutesMap.ROOT);
        break;
      default:
    }
  }, [navigate, net, pathname, state, user]);

  return null;
};
