import { FC, useEffect } from 'react';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';

const showFailed = () => modalService.showError(MessagesMap.LOGOUT_FAILED);

export const Logout: FC = () => {
  const navigate = useNavigateTo();

  useEffect(() => {
    app.account
      .logoutOrRemove('logout')
      .then((success) => {
        if (success) return navigate.toIndex(true);
        showFailed();
        navigate.back();
      })
      .catch(navigate.back);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
