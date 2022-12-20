import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppStatus } from '@api/constants';
import { IS_DEV, REGEXP_END_ON_SLASH } from '@constants/constants';
import { RoutesMap } from '@constants/router.constants';
import { useAppStatus } from '@hooks/useAppStatus';
import { app } from '@api/app/client.app';

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const status = useAppStatus();

  useEffect(() => {
    const { user, net } = app.getState();
    if (status !== AppStatus.READY) return;
    if (pathname !== RoutesMap.ROOT && REGEXP_END_ON_SLASH.test(pathname)) {
      return navigate(pathname.replace(REGEXP_END_ON_SLASH, ''));
    }
    switch (pathname) {
      case RoutesMap.ROOT:
      case RoutesMap.ACCOUNT.INDEX:
        if (!user) navigate(RoutesMap.ACCOUNT.LOGIN);
        if (net) app.netMethods.comeout();
        break;
      case RoutesMap.ACCOUNT.SIGNUP:
      case RoutesMap.ACCOUNT.LOGIN:
      case RoutesMap.ACCOUNT.OVERMAIL:
        if (user) navigate(RoutesMap.ROOT);
        break;
      case RoutesMap.PALETTE:
      case RoutesMap.MAIL:
        !IS_DEV && navigate(RoutesMap.ROOT);
        if (net) app.netMethods.comeout();
        break;
      default:
    }
  }, [navigate, pathname, status]);

  return null;
};
