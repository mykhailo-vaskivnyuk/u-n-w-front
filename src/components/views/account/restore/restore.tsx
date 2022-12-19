import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useMatchParam } from '@utils/utils';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';

const path = RoutesMap.ACCOUNT.RESTORE;

export const Restore: FC = () => {
  const navigate = useNavigate();
  const token = useMatchParam('token', path) as string;

  const navigateToIndex = () => navigate(RoutesMap.ROOT, { replace: true });
  const showFailed = () => modalService.showError(MessagesMap.BAD_LINK);

  useEffect(() => {
    if (!token) {
      showFailed();
      return navigateToIndex();
    }
    app.account
      .loginOverLink('restore', { token })
      .then((user) => {
        if (!user) showFailed();
        navigateToIndex();
      })
      .catch(navigateToIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
