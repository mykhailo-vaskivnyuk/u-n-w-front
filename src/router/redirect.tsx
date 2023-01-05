import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppStatus } from '@api/constants';
import { IS_DEV, REGEXP_END_ON_SLASH } from '@constants/constants';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { useMatchParam } from '@utils/utils';
import { useAppStatus } from '@hooks/useAppStatus';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';

const { INDEX: netPath } = RoutesMap.NET.NET_ID;
const showFailed = () => modalService.showError(MessagesMap.NET_COMEOUT_FAIL);

export const Redirect: FC = () => {
  const navigate = useNavigateTo();
  const { pathname } = useLocation();
  const status = useAppStatus();
  const isNet = useMatchParam('net_id', netPath, false);

  useEffect(() => {
    if (status !== AppStatus.READY) return;
    if (pathname !== RoutesMap.ROOT && REGEXP_END_ON_SLASH.test(pathname)) {
      return navigate.to(pathname.replace(REGEXP_END_ON_SLASH, ''));
    }
    const { user, net } = app.getState();
    if (!isNet && net)
      app.netMethods.comeout().catch(() => {
        showFailed();
        navigate.back();
      });
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
  }, [isNet, navigate, pathname, status]);

  return null;
};
