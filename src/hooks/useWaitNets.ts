import { useEffect, useState } from 'react';
import { IWaitNets } from '@app/common/server/types/net.types';
import { app } from '@client/app';

export const useWaitNets = () => {
  const [waitNets, setWaitNets] = useState<IWaitNets>(() => app.getState().waitNets);

  useEffect(() => {
    app.on('wait', setWaitNets);
    return () => {
      app.remove('wait', setWaitNets);
    };
  }, []);

  return waitNets;
};
