import { useEffect, useState } from 'react';
import { INetWaiting } from '@app/common/server/types/net.types';
import { app } from '@client/app';

export const useNetWaiting = () => {
  const [waiting, setWaiting] = useState<INetWaiting[]>([]);

  useEffect(() => {
    app.net
      .getNetWaiting()
      .then(setWaiting)
      .catch(() => setWaiting([]));
  }, []);

  return waiting;
};
