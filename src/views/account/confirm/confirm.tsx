import { FC, useEffect } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { useMatchParam } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';

const path = RoutesMap.ACCOUNT.CONFIRM;
const showSuccess = () => modalService.showMessage(MessagesMap.CONFIRM_SUCCESS);
const showFail = () => modalService.showError(MessagesMap.BAD_LINK);

export const Confirm: FC = () => {
  const navigate = useNavigateTo();
  const token = useMatchParam('token', path, true, false) as string;

  useEffect(() => {
    if (!token) {
      showFail();
      return navigate.toIndex(true);
    }
    app.account
      .loginOverLink('confirm', { token })
      .then((user) => {
        if (user) {
          showSuccess();
          return navigate.toAccount(true);
        }
        showFail();
        navigate.toIndex(true);
      })
      .catch(() => navigate.toIndex(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
