import { useCallback, useEffect, useState } from 'react';
import { IEvent, IEvents, NetViewKeys } from '@server/types/types';
import { app } from '@client/app';
import { modalService } from '@services/modal.service';

export const useEvents = (netView?: NetViewKeys) => {
  const [events, setEvents] = useState<IEvents>([]);
  const { net } = app.getState();

  const selectEvents = useCallback(
    (event: IEvent) => {
      const netId = net?.net_id;
      const { net_id: eventNetId } = event;
      if (!netView && !eventNetId) return true;
      if (netView && netId === event.net_id) return true;
      return false;
    },
    [netView, net],
  );

  const handleEvents = useCallback(
    (newEvents: IEvents) => {
      const showEvents = newEvents.filter(selectEvents);
      if (showEvents.length) setEvents(showEvents);
    },
    [selectEvents],
  );

  useEffect(() => {
    handleEvents(app.getState().events);
    app.on('events', handleEvents);
    return () => app.remove('events', handleEvents);
  }, [handleEvents]);

  useEffect(() => {
    const [event] = events;
    if (!event) return;
    const { event_id: eventId, message } = event;
    const handleClose = () => app.userEvents.confirm(eventId);
    modalService.showMessage(message, undefined, undefined, handleClose);
  }, [events]);

  return null;
};
