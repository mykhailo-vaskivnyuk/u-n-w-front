import { useCallback, useEffect, useState } from 'react';
import { IEvent, IEvents, NetViewKeys } from '@server/types/types';
import { app } from '@client/app';
import { modalService } from '@services/modal.service';

export const useEvents = (netView?: NetViewKeys) => {
  const [events, setEvents] = useState<IEvents>([]);
  const { status, userNetData } = app.getState();

  const selectEvents = useCallback(
    (event: IEvent) => {
      const { node_id: nodeId } = userNetData || {};
      const { member_id: eventMemberId } = event;
      if (!netView && !eventMemberId) return true;
      if (netView && nodeId && nodeId === eventMemberId) return true;
      return false;
    },
    [userNetData, netView],
  );

  const handleEvents = useCallback(
    (newEvents: IEvents) => {
      const showEvents = newEvents.filter(selectEvents);
      if (showEvents.length) setEvents(showEvents);
    },
    [selectEvents],
  );

  const handleClose = useCallback((messageId: number) => {
    app.userEvents.confirm(messageId);
  }, []);

  useEffect(() => handleEvents(app.getState().events), [handleEvents]);

  useEffect(() => {
    app.on('events', handleEvents);
    return () => app.remove('events', handleEvents);
  }, [handleEvents]);

  useEffect(() => {
    const [event] = events;
    if (!event) return;
    const { event_id: eventId, message } = event;
    modalService.showMessage(message, undefined, undefined, () => handleClose(eventId));
    app.userEvents.remove(eventId);
  }, [events, handleClose, status]);

  return null;
};
