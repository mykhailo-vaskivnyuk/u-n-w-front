import { FC, useEffect } from 'react';
import { app } from '@api/app/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/router/constants';
import { MessagesMap } from '@constants/messages';

export const Restore: FC = () => {
  const navigate = useNavigate();
  const path = RoutesMap.ACCOUNT.RESTORE.replace('*', ':link');
  const { params } = useMatch<'link', typeof path>({ path }) || {};

  const navigateToIndex = () => navigate(RoutesMap.INDEX, { replace: true });
  const showFailed = () => modalService.showError(MessagesMap.BAD_LINK);

  useEffect(() => {
    const { link } = params || {};
    if (!link) {
      showFailed();
      return navigateToIndex();
    }
    app.account
      .loginOverLink('restore', { link })
      .then((user) => {
        if (!user) showFailed();
        navigateToIndex();
      })
      .catch(navigateToIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
