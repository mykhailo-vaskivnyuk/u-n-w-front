import { useCallback, useEffect, useRef, useState } from 'react';
import { IEvent, IEvents, NetViewKeys } from '@server/types/types';
import { app } from '@client/app';
import { modalService } from '@services/modal.service';
import { EventsStore } from '@app/common/client/classes/events.store.class';

export const useEvents = (netView?: NetViewKeys) => {
  const [events, setEvents] = useState<IEvents>([]);
  const currentEvent = useRef<IEvent | null>(null);
  const { net } = app.getState();
  const { net_id: netId = 0 } = net || {};

  const handleEvents = useCallback(
    (eventsMap: Map<number, EventsStore>) => {
      if (netView && !netId) return;
      const eventsStore = eventsMap.get(netId);
      if (!eventsStore) return;
      const showEvents = eventsStore.state.events;
      setEvents(showEvents);
    },
    [netId, netView],
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
