import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { format } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { useNet } from '@hooks/useNet';
import { app } from '@api/app/client.app';

export const NetLeave: FC = () => {
  const navigate = useNavigate();
  const [net] = useNet();
  const navigateToIndex = () => navigate(RoutesMap.ROOT, { replace: true });
  const navigateBack = () => navigate(-1);
  const showSuccess = () =>
    modalService.showMessage(format(MessagesMap.NET_LEAVE, net?.name || ''));
  const showFailed = () => modalService.showError(MessagesMap.NET_LEAVE_FAILED);

  useEffect(() => {
    app.netMethods
      .leave()
      .then((success) => {
        if (success) {
          showSuccess();
          return navigateToIndex();
        }
        showFailed();
        navigateBack();
      })
      .catch(navigateBack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
