import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { makeDynamicPathname, useMatchParam } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';

const invitePath = RoutesMap.NET.INVITE;
const netPath = RoutesMap.NET.NET_ID.INDEX;
const showSuccess = () => modalService.showMessage(MessagesMap.NET_CONNECTED);
const showFailed = () => modalService.showError(MessagesMap.NET_CONNECT_FAILED);
const showBadLink = () => modalService.showError(MessagesMap.BAD_LINK);

export const NetInvite: FC = () => {
  const token = useMatchParam('token', invitePath) as string;

  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);
  const navigateToNet = (netId: number) =>
    navigate(makeDynamicPathname(netPath, netId), { replace: true, state: 'circle' });

  useEffect(() => {
    if (!token) {
      showBadLink();
      return navigateBack();
    }
    app.netMethods
      .connectByInvite({ token })
      .then((result) => {
        if (!result) {
          showBadLink();
          return navigateBack();
        }
        const { net_id: netId, error } = result;
        if (error) showFailed();
        else showSuccess();
        navigateToNet(netId);
      })
      .catch(navigateBack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
