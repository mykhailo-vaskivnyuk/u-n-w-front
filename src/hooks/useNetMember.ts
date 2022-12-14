import { useEffect, useState } from 'react';
import { NetViewKeys } from '@api/api/types/types';
import { RoutesMap } from '@constants/router.constants';
import { useMatchParam } from '@utils/utils';
import { app } from '@api/app/client.app';

const path = {
  circle: RoutesMap.NET.NET_ID.CIRCLE.NODE_ID.INDEX,
  tree: RoutesMap.NET.NET_ID.TREE.NODE_ID.INDEX,
};

export const useNetMember = (netView: NetViewKeys) => {
  const nodeId = useMatchParam('node_id', path[netView], false) as number;
  const { memberData } = app.getState();
  const { node_id: curNodeId } = memberData || {};
  const [loading, setLoading] = useState(curNodeId !== nodeId);

  useEffect(() => {
    if (!loading) return;
    app.member.find(netView, nodeId).finally(() => setLoading(false));
  }, [loading, netView, nodeId]);

  return [loading, memberData];
};
