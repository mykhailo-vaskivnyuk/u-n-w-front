import { useEffect, useState } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { useMatchParam } from '@utils/utils';
import { app } from '@api/app/client.app';

const path = RoutesMap.NET.NET_ID.INDEX;

export const useUserNet = () => {
  const netId = useMatchParam('net_id', path, false) as number;
  const { net } = app.getState();
  const [loading, setLoading] = useState(() => !net || net.net_id !== netId);

  useEffect(() => {
    if (!loading) return;
    app.netMethods.enter(netId).then(() => setLoading(false));
  }, [loading, netId]);

  return [loading, net];
};
