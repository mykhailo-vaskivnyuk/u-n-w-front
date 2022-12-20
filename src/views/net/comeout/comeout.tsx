import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';

export const NetComeout: FC = () => {
  const navigate = useNavigate();

  const navigateToIndex = () => navigate(RoutesMap.ROOT, { replace: true });
  const navigateBack = () => navigate(-1);
  const showFailed = () => modalService.showError(MessagesMap.NET_COMEOUT_FAILED);

  useEffect(() => {
    app.netMethods
      .comeout()
      .then((success) => {
        if (success) return navigateToIndex();
        showFailed();
        navigateBack();
      })
      .catch(() => {
        showFailed();
        navigateBack();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
