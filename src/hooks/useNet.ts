import { useEffect, useState } from 'react';
import { INetResponse } from '@api/api/types/types';
import { TUserGetNetsResponse } from '@api/api/types/client.api.types';
import { app } from '@api/app/client.app';

export const useNet = () => {
  const [net, setNet] = useState<INetResponse | null>(() => app.getState().net);
  const [nets, setNets] = useState<TUserGetNetsResponse>(() => app.getState().nets);
  useEffect(() => {
    const handlerNet = (data: INetResponse | null) => setNet(data);
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
