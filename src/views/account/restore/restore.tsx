import { FC, useEffect } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { useMatchParam } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';

const path = RoutesMap.ACCOUNT.RESTORE;
const showFailed = () => modalService.showError(MessagesMap.BAD_LINK);

export const Restore: FC = () => {
  const navigate = useNavigateTo();
  const token = useMatchParam('token', path, true, false) as string;

  useEffect(() => {
    if (!token) {
      showFailed();
      return navigate.toIndex(true);
    }
    app.account
      .loginOverLink('restore', { token })
      .then((user) => {
        if (!user) showFailed();
        navigate.toIndex(true);
      })
      .catch(() => navigate.toIndex(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
