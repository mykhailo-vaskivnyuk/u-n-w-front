import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useMatchParam } from '@utils/utils';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';

const path = RoutesMap.ACCOUNT.CONFIRM;
const showSuccess = () => modalService.showMessage(MessagesMap.CONFIRM_SUCCESS);
const showFail = () => modalService.showError(MessagesMap.BAD_LINK);

export const Confirm: FC = () => {
  const token = useMatchParam('token', path) as string;

  const navigate = useNavigate();
  const navigateToIndex = () => navigate(RoutesMap.ROOT, { replace: true });
  const navigateToAccount = () => navigate(RoutesMap.ACCOUNT.INDEX, { replace: true });

  useEffect(() => {
    if (!token) {
      showFail();
      return navigateToIndex();
    }
    app.account
      .loginOverLink('confirm', { token })
      .then((user) => {
        if (user) {
          showSuccess();
          return navigateToAccount();
        }
        showFail();
        navigateToIndex();
      })
      .catch(navigateToIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
