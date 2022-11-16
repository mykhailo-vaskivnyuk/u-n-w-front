import { useEffect, useState } from 'react';
import { INetCreateResponse } from '@api/api/types/types';
import { app } from '@api/app/client.app';
import { TNetReadUserNetsResponse } from '@api/api/types/client.api.types';

export const useNet = () => {
  const [net, setNet] = useState<INetCreateResponse | null>(() => app.getState().net);
  const [nets, setNets] = useState<TNetReadUserNetsResponse[]>(() => app.getState().nets);
  useEffect(() => {
    const handler = (data: INetCreateResponse | null) => setNet(data);
    const handlerNets = (data: TNetReadUserNetsResponse[]) => setNets(data);
    app.on('net', handler);
    app.on('nets', handlerNets);
    return () => {
      app.remove('net', handler);
      app.remove('nets', handlerNets);
    };
  }, []);

  return [net, nets] as const;
};
