import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { format, makeDynamicPathname } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { useNet } from '@hooks/useNet';
import { app } from '@api/app/client.app';

const { NET_ID } = RoutesMap.NET;
const { NET_LEAVE, NET_LEAVE_FAILED } = MessagesMap;

export const NetLeave: FC = () => {
  const [net] = useNet();
  const { parent_net_id: parentNetId } = net || {};

  const navigate = useNavigate();
  const navigateToIndex = () => navigate(RoutesMap.ROOT, { replace: true });
  const navigateToNet = (netId: number) =>
    navigate(makeDynamicPathname(NET_ID.INDEX, netId), { replace: true });
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
        parentNetId ? navigateToNet(parentNetId) : navigateToIndex();
      })
      .catch(navigateBack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
