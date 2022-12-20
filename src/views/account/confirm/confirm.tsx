import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useMatchParam } from '@utils/utils';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';

const path = RoutesMap.ACCOUNT.CONFIRM;

export const Confirm: FC = () => {
  const navigate = useNavigate();
  const token = useMatchParam('token', path) as string;
  const navigateToIndex = () => navigate(RoutesMap.ROOT, { replace: true });
  const navigateToAccount = () => navigate(RoutesMap.ACCOUNT.INDEX, { replace: true });
  const showSuccess = () => modalService.showMessage(MessagesMap.CONFIRM_SUCCESS);
  const showFailed = () => modalService.showError(MessagesMap.BAD_LINK);

  useEffect(() => {
    if (!token) {
      showFailed();
      return navigateToIndex();
    }
    app.account
      .loginOverLink('confirm', { token })
      .then((user) => {
        if (user) {
          showSuccess();
          return navigateToAccount();
        }
        showFailed();
        navigateToIndex();
      })
      .catch(navigateToIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
