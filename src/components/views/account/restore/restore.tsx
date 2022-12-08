import { FC, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';

const path = RoutesMap.ACCOUNT.RESTORE;

export const Restore: FC = () => {
  const navigate = useNavigate();
  const { params } = useMatch<'token', typeof path>({ path }) || {};

  const navigateToIndex = () => navigate(RoutesMap.ROOT, { replace: true });
  const showFailed = () => modalService.showError(MessagesMap.BAD_LINK);

  useEffect(() => {
    const { token } = params || {};
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
