import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { format, makeDynamicPathname } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { useNet } from '@hooks/useNet';
import { app } from '@api/app/client.app';

const { COMEOUT, NET_NUMBER } = RoutesMap.NET;
const { NET_LEAVE, NET_LEAVE_FAILED } = MessagesMap;

export const NetLeave: FC = () => {
  const navigate = useNavigate();
  const [net] = useNet();
  const { parent_net_id: parentNetId } = net || {};
  const parntNetPathname = parentNetId && makeDynamicPathname(NET_NUMBER.INDEX, parentNetId);
  const navigateToComeout = () => navigate(COMEOUT, { replace: true });
  const navigateToNet = (pathname: string) => navigate(pathname, { replace: true });
  const navigateBack = () => navigate(-1);
  const showSuccess = () => modalService.showMessage(format(NET_LEAVE, net?.name || ''));
  const showFailed = () => modalService.showError(NET_LEAVE_FAILED);

  useEffect(() => {
    app.netMethods
      .leave()
      .then((success) => {
        if (!success) {
          showFailed();
          return navigateBack();
        }
        showSuccess();
        parntNetPathname ? navigateToNet(parntNetPathname) : navigateToComeout();
      })
      .catch(navigateBack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
