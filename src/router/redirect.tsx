import { FC, useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import { AppStatus } from '@client/constants';
import { IS_DEV, REGEXP_BAD_HASH, REGEXP_END_ON_SLASH } from '@constants/constants';
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
  const status = useAppStatus();
  const navigate = useNavigateTo();
  const location = useLocation();
  const isNet = useMatchParam('net_id', netPath, false);
  const isNetRoute = useMatch({ path: '/net', end: false });

  useEffect(() => {
    if (status !== AppStatus.READY && status !== AppStatus.ERROR) return;
    const { pathname: wPathname, hash: wHash } = window.location;
    const { pathname } = location;
    if (wPathname === RoutesMap.ROOT) {
      if (REGEXP_BAD_HASH.test(wHash)) return navigate.toIndex();
    } else if (REGEXP_END_ON_SLASH.test(pathname)) {
      return navigate.to(pathname.replace(REGEXP_END_ON_SLASH, ''));
    }
    const { user, net, tg } = app.getState();
    if (!isNet && net)
      app.net.comeout().catch(() => {
        showFailed();
        navigate.back();
      });
    switch (pathname) {
      case RoutesMap.ROOT:
      case RoutesMap.ACCOUNT.INDEX:
        if (user) break;
        if (tg) navigate.toSignup(true);
        else navigate.toLogin();
        break;
      case RoutesMap.ACCOUNT.SIGNUP:
      case RoutesMap.ACCOUNT.LOGIN:
      case RoutesMap.ACCOUNT.OVERMAIL:
        if (user) navigate.toIndex();
        break;
      case RoutesMap.PALETTE:
      case RoutesMap.MAIL:
        if (IS_DEV) break;
        navigate.toIndex();
        break;
      default:
    }
  }, [isNet, isNetRoute, location, navigate, status]);

  return null;
};
