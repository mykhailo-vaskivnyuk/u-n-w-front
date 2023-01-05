import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { useMatchParam } from '@utils/utils';
import { app } from '@api/app/client.app';

const path = RoutesMap.NET.NET_ID.INDEX;

export const useUserNet = () => {
  const netId = useMatchParam('net_id', path, false) as number;
  const { net } = app.getState();
  const { netView = 'tree' } = useLocation().state || {};
  const [loading, setLoading] = useState(() => !net || net.net_node_id !== netId);

  useEffect(() => {
    if (!loading) return;
    app.netMethods.enter(netId).then(() => {
      app.netMethods.setView(netView);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, netId]);

  return [loading, net];
};
