import { FC, useEffect } from 'react';
import { app } from '@api/app/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/router/constants';
import { MessagesMap } from '@constants/messages';

export const Confirm: FC = () => {
  const navigate = useNavigate();
  const path = RoutesMap.ACCOUNT.CONFIRM.replace('*', ':token');
  const { params } = useMatch<'token', typeof path>({ path }) || {};

  const navigateToIndex = () => navigate(RoutesMap.INDEX, { replace: true });
  const navigateToAccount = () => navigate(RoutesMap.ACCOUNT.INDEX, { replace: true });
  const showSuccess = () => modalService.showMessage(MessagesMap.CONFIRM_SUCCESS);
  const showFailed = () => modalService.showError(MessagesMap.BAD_LINK);

  useEffect(() => {
    const { token } = params || {};
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
