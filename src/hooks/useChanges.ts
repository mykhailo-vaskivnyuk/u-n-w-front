import { useCallback, useEffect, useState } from 'react';
import { IEvent, IEvents, NetViewKeys } from '@server/types/types';
import { app } from '@client/app';
import { modalService } from '@services/modal.service';

export const useChanges = (netView?: NetViewKeys) => {
  const [changes, setChanges] = useState<IEvents>([]);
  const { net, status } = app.getState();

  const selectChanges = useCallback(
    (change: IEvent) => {
      const { net_id: netId } = net || {};
      const { net_id: changeNetId } = change;
      if (!netView && !changeNetId) return true;
      if (netView && netId && netId === changeNetId) return true;
      return false;
    },
    [netView, net],
  );

  const handleChanges = useCallback(
    (netChanges: IEvents) => {
      const showChanges = netChanges.filter(selectChanges);
      if (showChanges.length) setChanges(showChanges);
    },
    [selectChanges],
  );

  const handleClose = useCallback((messageId: number) => {
    app.changes.confirm(messageId);
  }, []);

  useEffect(() => handleChanges(app.getState().changes), [handleChanges]);

  useEffect(() => {
    app.on('changes', handleChanges);
    return () => app.remove('changes', handleChanges);
  }, [handleChanges]);

  useEffect(() => {
    const [change] = changes;
    if (!change) return;
    const { event_id: eventId, message } = change;
    modalService.showMessage(message, undefined, undefined, () => handleClose(eventId));
    app.changes.remove(eventId);
  }, [changes, handleClose, status]);

  return null;
};
