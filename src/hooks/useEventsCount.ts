import { useEffect, useState } from 'react';
import { app } from '@client/app';
import { EventStore } from '@app/common/client/classes/event.store.class';

export const useEventsCount = () => {
  const [eventsCount, setEventsCount] = useState(0);

  useEffect(() => {
    const handler = (events: Map<number, EventStore>) => {
      const count = events.get(0)!.getAllCount();
      setEventsCount(count);
    };
    app.on('events', handler);
    return () => app.remove('events', handler);
  }, []);

  return eventsCount;
};
