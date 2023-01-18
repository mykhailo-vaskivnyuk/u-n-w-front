import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { useMatchParam } from '@utils/utils';
import { app } from '@api/app/client.app';

const path = RoutesMap.NET.NET_ID.INDEX;

export const useUserNet = () => {
  const netId = useMatchParam('net_id', path, false) as number;
  const { netView = 'tree' } = useLocation().state || {};

  const { net } = app.getState();
  const { net_node_id: netNodeId } = net || {};
  const [loading, setLoading] = useState(false);

  const loaded = netNodeId !== netId;

  useEffect(() => {
    if (loading) return;
    setLoading(!loaded);
    app.netMethods.enter(netId).then(() => {
      app.netMethods.setView(netView);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netId, net, loading]);

  return [loading || !loaded, net];
};
