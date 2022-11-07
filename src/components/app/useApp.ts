// import { app } from '@api/app/client.app';
import { app } from '@api/app/client.app';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { useEffect } from 'react';

export const useApp = () => {
  const showFailed = () => modalService.showError(MessagesMap.SERVER_ERROR);

  useEffect(() => {
    app.init().catch(() => {});
  }, []);
};
