import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppStatus } from '@api/constants';
import { IS_DEV, REGEXP_END_ON_SLASH } from '@constants/constants';
import { RoutesMap } from '@constants/router.constants';
import { useAppStatus } from '@hooks/useAppStatus';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const status = useAppStatus();
  const user = useUser();
  const [net] = useNet();

  useEffect(() => {
    if (status !== AppStatus.READY) return;
    if (pathname !== RoutesMap.ROOT && REGEXP_END_ON_SLASH.test(pathname)) {
      return navigate(pathname.replace(REGEXP_END_ON_SLASH, ''));
    }
    switch (pathname) {
      case RoutesMap.ROOT:
      case RoutesMap.ACCOUNT.INDEX:
        if (!user) return navigate(RoutesMap.ACCOUNT.LOGIN);
        if (user.user_state === 'INSIDE_NET') navigate(RoutesMap.NET.COMEOUT);
        break;
      case RoutesMap.ACCOUNT.SIGNUP:
      case RoutesMap.ACCOUNT.LOGIN:
      case RoutesMap.ACCOUNT.OVERMAIL:
        if (!user) return;
        if (user.user_state === 'INSIDE_NET') navigate(RoutesMap.NET.COMEOUT);
        break;
      // case RoutesMap.NET.INDEX:
      // case RoutesMap.NET.COMEOUT:
      // case RoutesMap.NET.LEAVE:
      // case RoutesMap.NET.CREATE:
      //   if (!net) navigate(RoutesMap.ROOT); // &
      //   break;
      case RoutesMap.PALETTE:
      case RoutesMap.MAIL:
        if (net) navigate(RoutesMap.NET.COMEOUT);
        !IS_DEV && navigate(RoutesMap.ROOT);
        break;
      default:
    }
  }, [navigate, net, pathname, status, user]);

  return null;
};
