import { useEffect, useState } from 'react';
import { INetResponse } from '@api/api/types/types';
import { INets } from '@api/app/types';
import { app } from '@api/app/client.app';

export const useNet = () => {
  const [net, setNet] = useState<INetResponse | null>(() => app.getState().net);
  const [nets, setNets] = useState<INets>(() => app.getState().nets);
  console.log('NET', net);
  const { circle, tree } = app.getState();

  useEffect(() => {
    const handlerNet = (data: INetResponse | null) => setNet(data);
    const handlerNets = (data: INets) => setNets(data);
    app.on('net', handlerNet);
    app.on('nets', handlerNets);
    return () => {
      app.remove('net', handlerNet);
      app.remove('nets', handlerNets);
    };
  }, []);

  return [net, nets, circle, tree] as const;
};
