import { useEffect, useState } from 'react';
import { INetCreateResponse } from '@api/api/types/types';
import { TUserGetNetsResponse } from '@api/api/types/client.api.types';
import { app } from '@api/app/client.app';

export const useNet = () => {
  const [net, setNet] = useState<INetCreateResponse | null>(() => app.getState().net);
  const [nets, setNets] = useState<TUserGetNetsResponse>(() => app.getState().nets);
  useEffect(() => {
    const handlerNet = (data: INetCreateResponse | null) => setNet(data);
    const handlerNets = (data: TUserGetNetsResponse) => setNets(data);
    app.on('net', handlerNet);
    app.on('nets', handlerNets);
    return () => {
      app.remove('net', handlerNet);
      app.remove('nets', handlerNets);
    };
  }, []);

  return [net, nets] as const;
};
