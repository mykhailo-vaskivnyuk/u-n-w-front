import { useCallback, useEffect, useRef, useState } from 'react';
import { IEvent, IEvents, NetViewKeys } from '@server/types/types';
import { app } from '@client/app';
import { modalService } from '@services/modal.service';

export const useEvents = (netView?: NetViewKeys) => {
  const [events, setEvents] = useState<IEvents>([]);
  const currentEvent = useRef<IEvent | null>(null);
  const { net } = app.getState();
  const { net_id: netId } = net || {};

  const selectEvents = useCallback(
    (event: IEvent) => {
      const eventNetId = event.net_id;
      if (!netView && !eventNetId) return true;
      if (netView && netId === eventNetId) return true;
      return false;
    },
    [netView, netId],
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
    if (currentEvent.current) return;
    const [event] = events;
    if (!event) return;
    currentEvent.current = event;
    const { event_id: eventId, message } = event;
    const handleClose = () => {
      currentEvent.current = null;
      app.userEvents.confirm(eventId);
    };
    modalService.showMessage(message, undefined, undefined, handleClose);
  }, [events]);

  return null;
};
