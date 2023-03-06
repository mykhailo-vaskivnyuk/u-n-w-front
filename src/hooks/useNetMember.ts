import { useEffect, useState } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { useMatchParam } from '@utils/utils';
import { app } from '@client/app';

const path = {
  circle: RoutesMap.NET.NET_ID.CIRCLE.NODE_ID.INDEX,
  tree: RoutesMap.NET.NET_ID.TREE.NODE_ID.INDEX,
};

export const useNetMember = () => {
  const setRerender = useState([])[1];
  const { memberData, netView } = app.getState();
  const { node_id: curNodeId } = memberData || {};
  const nodeId = useMatchParam('node_id', path[netView!], false) as number;
  const loaded = curNodeId === nodeId;

  useEffect(() => {
    if (loaded) return;
    app.net.findMember(nodeId);
    setRerender([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return loaded && memberData;
};
