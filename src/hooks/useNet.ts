import { useEffect, useState } from 'react';
import { INetResponse } from '@server/types/types';
import { INets } from '@client/types';
import { app } from '@client/app';

export const useNet = () => {
  const [net, setNet] = useState<INetResponse | null>(() => app.getState().net);
  const [nets, setNets] = useState<INets>(() => app.getState().nets);

  const { circle, tree } = app.getState();

  useEffect(() => {
    app.on('net', setNet);
    app.on('nets', setNets);
    return () => {
      app.remove('net', setNet);
      app.remove('nets', setNets);
    };
  }, []);

  return [net, nets, circle, tree] as const;
};
