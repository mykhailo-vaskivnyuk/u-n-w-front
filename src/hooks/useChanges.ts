import { useCallback, useEffect, useState } from 'react';
import { IEvent, IEvents, NetViewKeys } from '@server/types/types';
import { AppStatus } from '@client/constants';
import { app } from '@client/app';
import { modalService } from '@services/modal.service';

export const useChanges = (netView?: NetViewKeys) => {
  const [changes, setChanges] = useState<IEvents>([]);
  const { status } = app.getState();

  const selectChanges = useCallback(
    (change: IEvent) => {
      const { net } = app.getState();
      const { net_id: netId } = net || {};
      const { net_id: changeNetId } = change;
      if (!netView && !changeNetId) return true;
      if (netView && netId === changeNetId) return true;
      return false;
    },
    [netView],
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

  useEffect(() => {
    if (status !== AppStatus.READY) return;
    handleChanges(app.getState().changes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleChanges]);

  useEffect(() => {
    app.on('changes', handleChanges);
    return () => app.remove('changes', handleChanges);
  }, [handleChanges]);

  useEffect(() => {
    if (status !== AppStatus.READY) return;
    const [change] = changes;
    if (!change) return;
    const { event_id: eventId, message } = change;
    modalService.showMessage(message, undefined, undefined, () => handleClose(eventId));
    app.changes.remove(eventId);
  }, [changes, handleClose, status]);

  return null;
};
