import { useCallback, useEffect, useState } from 'react';
import { IUserChange, IUserChanges } from '@api/api/types/types';
import { app } from '@api/app/client.app';
import { AppStatus } from '@api/constants';
import { modalService } from '@services/modal.service';

export const useChanges = () => {
  const [changes, setChanges] = useState<IUserChanges>([]);
  const { net, netView, status } = app.getState();
  const { node_id: nodeId } = net || {};

  const selectChanges = useCallback(
    (change: IUserChange) => {
      const { user_node_id: userNodeId, net_view: userNetView } = change;
      if (!nodeId && !userNodeId) return true;
      if (userNodeId !== nodeId) return false;
      if (userNetView === 'net') return true;
      if (userNetView === netView) return true;
      return false;
    },
    [nodeId, netView],
  );

  const handleChanges = useCallback(
    (netChanges: IUserChanges) => {
      const showChanges = netChanges.filter(selectChanges);
      if (showChanges.length) setChanges(showChanges);
    },
    [selectChanges],
  );

  useEffect(() => {
    app.on('changes', handleChanges);
    return () => app.remove('changes', handleChanges);
  }, [handleChanges]);

  useEffect(() => {
    handleChanges(app.getState().changes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netView, nodeId]);

  const handleClose = useCallback((messageId: number) => {
    app.changes.confirm(messageId);
  }, []);

  useEffect(() => {
    if (status !== AppStatus.READY) return;
    const [change] = changes;
    if (!change) return;
    const { message_id: messageId, message } = change;
    modalService.showMessage(message, undefined, undefined, () => handleClose(messageId));
  }, [changes, handleClose, status]);

  return null;
};
