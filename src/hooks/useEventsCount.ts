import { useEffect, useState } from 'react';
import { app } from '@client/app';
import { EventsStore } from '@app/common/client/classes/events.store.class';

export const useEventsCount = () => {
  const [eventsCount, setEventsCount] = useState(0);

  useEffect(() => {
    const handler = (events: Map<number, EventsStore>) => {
      const eventsStore = events.get(0)!;
      const { events: accountEvents, childEventsCount } = eventsStore.state;
      const count = accountEvents.length + childEventsCount;
      setEventsCount(count);
    };
    app.on('events', handler);
    return () => app.remove('events', handler);
  }, []);

  return eventsCount;
};
