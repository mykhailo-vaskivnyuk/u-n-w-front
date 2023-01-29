import { useCallback, useEffect, useState } from 'react';
import { IUserChange, IUserChanges, NetViewKeys } from '@api/api/types/types';
import { AppStatus } from '@api/constants';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';

export const useChanges = (netView?: NetViewKeys) => {
  const [changes, setChanges] = useState<IUserChanges>([]);
  const { net: currentNet, status } = app.getState();
  const { net_node_id: netNodeId } = currentNet || {};

  const selectChanges = useCallback(
    (change: IUserChange) => {
      const { net } = app.getState();
      const { node_id: nodeId } = net || {};
      const { user_node_id: userNodeId } = change;
      if (!netView && !userNodeId) return true;
      if (netView && nodeId === userNodeId) return true;
      return false;
    },
    [netView],
  );

  const handleChanges = useCallback(
    (netChanges: IUserChanges) => {
      const showChanges = netChanges.filter(selectChanges);
      if (showChanges.length) setChanges(showChanges);
    },
    [selectChanges],
  );

  const handleClose = useCallback((messageId: number) => {
    app.changes.confirm(messageId);
  }, []);

  useEffect(() => {
    if (netView && !netNodeId) return;
    handleChanges(app.getState().changes);
  }, [handleChanges, netNodeId, netView]);

  useEffect(() => {
    app.on('changes', handleChanges);
    return () => app.remove('changes', handleChanges);
  }, [handleChanges]);

  useEffect(() => {
    if (status !== AppStatus.READY) return;
    const [change] = changes;
    if (!change) return;
    const { message_id: messageId, message } = change;
    modalService.showMessage(message, undefined, undefined, () => handleClose(messageId));
  }, [changes, handleClose, status]);

  return null;
};
