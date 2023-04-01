import { FC, useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import { AppStatus } from '@client/constants';
import { IS_DEV, REGEXP_END_ON_SLASH } from '@constants/constants';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { useMatchParam } from '@utils/utils';
import { useAppStatus } from '@hooks/useAppStatus';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';

const { INDEX: netPath } = RoutesMap.NET.NET_ID;
const showFailed = () => modalService.showError(MessagesMap.NET_COMEOUT_FAIL);

export const Redirect: FC = () => {
  const navigate = useNavigateTo();
  const { pathname } = useLocation();
  const status = useAppStatus();
  const isNet = useMatchParam('net_id', netPath, false);
  const isNetRoute = useMatch({ path: '/net', end: false });

  useEffect(() => {
    if (status !== AppStatus.READY && status !== AppStatus.ERROR) return;
    if (pathname !== RoutesMap.ROOT && REGEXP_END_ON_SLASH.test(pathname)) {
      return navigate.to(pathname.replace(REGEXP_END_ON_SLASH, ''));
    }
    const { user, net } = app.getState();
    if (!isNet && net) {
      app.net.comeout().catch(() => {
        showFailed();
        navigate.back();
      });
    }
    if (isNetRoute && !user) return navigate.toIndex();
    switch (pathname) {
      case RoutesMap.ROOT:
      case RoutesMap.ACCOUNT.INDEX:
        if (!user) navigate.toLogin();
        break;
      case RoutesMap.ACCOUNT.SIGNUP:
      case RoutesMap.ACCOUNT.LOGIN:
      case RoutesMap.ACCOUNT.OVERMAIL:
        if (user) navigate.toIndex();
        break;
      case RoutesMap.PALETTE:
      case RoutesMap.MAIL:
        !IS_DEV && navigate.toIndex();
        break;
      default:
    }
  }, [isNet, isNetRoute, navigate, pathname, status]);

  return null;
};
