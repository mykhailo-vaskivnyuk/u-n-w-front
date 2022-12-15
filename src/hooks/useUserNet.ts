import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { app } from '@api/app/client.app';
import { useNet } from './useNet';

const path = RoutesMap.NET.NET_ID.INDEX;

export const useUserNet = () => {
  const [loading, setLoading] = useState(true);
  const [net] = useNet();

  const { params } = useMatch<'net_id', typeof path>({ path, end: false }) || {};
  const { net_id: strNetId } = params || {};

  useEffect(() => {
    const netId = Number(strNetId);
    if (net && net.net_id === netId) return;
    app.netMethods.enter(netId).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strNetId]);

  return [loading, net];
};
