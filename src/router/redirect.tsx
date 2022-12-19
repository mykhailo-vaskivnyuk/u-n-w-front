import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppStatus } from '@api/constants';
import { IS_DEV, REGEXP_END_ON_SLASH } from '@constants/constants';
import { RoutesMap } from '@constants/router.constants';
import { useAppStatus } from '@hooks/useAppStatus';
import { useUser } from '@hooks/useUser';

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const status = useAppStatus();
  const user = useUser();

  useEffect(() => {
    if (status !== AppStatus.READY) return;
    if (pathname !== RoutesMap.ROOT && REGEXP_END_ON_SLASH.test(pathname)) {
      return navigate(pathname.replace(REGEXP_END_ON_SLASH, ''));
    }
    switch (pathname) {
      case RoutesMap.ROOT:
      case RoutesMap.ACCOUNT.INDEX:
        if (!user) navigate(RoutesMap.ACCOUNT.LOGIN);
        break;
      case RoutesMap.ACCOUNT.SIGNUP:
      case RoutesMap.ACCOUNT.LOGIN:
      case RoutesMap.ACCOUNT.OVERMAIL:
        if (user) navigate(RoutesMap.ROOT);
        break;
      case RoutesMap.PALETTE:
      case RoutesMap.MAIL:
        !IS_DEV && navigate(RoutesMap.ROOT);
        break;
      default:
    }
  }, [navigate, pathname, status, user]);

  return null;
};
