import { FC, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '@api/constants';
import { IS_DEV, REGEXP_END_ON_SLASH } from '@constants/constants';
import { RoutesMap } from '@constants/router.constants';
import { useAppState } from '@hooks/useAppState';
import { useUser } from '@hooks/useUser';
import { useNet } from '@hooks/useNet';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const state = useAppState();
  const user = useUser();
  const [net] = useNet();

  const netPathname = net && makeDynamicPathname(RoutesMap.NET.NET_NUMBER.INDEX, net.net_id);
  const netComeout = useCallback(
    () =>
      app.netMethods.comeout().then((success) => success || !netPathname || navigate(netPathname)),
    [navigate, netPathname],
  );

  useEffect(() => {
    if (state === AppState.INITING) return;
    if (pathname !== RoutesMap.ROOT && REGEXP_END_ON_SLASH.test(pathname)) {
      return navigate(pathname.replace(REGEXP_END_ON_SLASH, ''));
    }
    switch (pathname) {
      case RoutesMap.ROOT:
      case RoutesMap.ACCOUNT.INDEX:
        if (!user) return navigate(RoutesMap.ACCOUNT.LOGIN);
        if (user.user_state === 'INSIDE_NET') netComeout();
        break;
      case RoutesMap.ACCOUNT.SIGNUP:
      case RoutesMap.ACCOUNT.LOGIN:
      case RoutesMap.ACCOUNT.OVERMAIL:
        if (!user) return;
        if (user.user_state === 'INSIDE_NET')
          netComeout().then((next) => next && navigate(RoutesMap.ROOT));
        break;
      case RoutesMap.NET.INDEX:
      case RoutesMap.NET.COMEOUT:
      case RoutesMap.NET.LEAVE:
      case RoutesMap.NET.CREATE:
        // if (!net) navigate(RoutesMap.ROOT);
        break;
      case RoutesMap.PALETTE:
      case RoutesMap.MAIL:
        if (net) netComeout();
        !IS_DEV && navigate(RoutesMap.ROOT);
        break;
      default:
    }
  }, [navigate, net, netComeout, pathname, state, user]);

  return null;
};
