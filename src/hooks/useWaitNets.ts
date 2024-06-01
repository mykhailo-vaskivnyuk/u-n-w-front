import { useCallback, useEffect, useState } from 'react';
import { IWaitNets } from '@app/common/server/types/net.types';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';

const showSuccess = () => modalService.showMessage(MessagesMap.WAIT_REMOVED);

export const useWaitNets = () => {
  const [waitNets, setWaitNets] = useState<IWaitNets>(() => app.getState().waitNets);

  useEffect(() => {
    app.on('waitNets', setWaitNets);
    app.userNets.getWaitNets();
    return () => {
      app.remove('waitNets', setWaitNets);
    };
  }, []);

  const onRemove = useCallback((net_id: number) => {
    app.userNets
      .waitRemove({ net_id })
      .then(showSuccess)
      .catch(() => {});
  }, []);

  return { waitNets, onRemove };
};
