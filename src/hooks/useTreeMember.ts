import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { app } from '@api/app/client.app';

const path = RoutesMap.NET.NET_ID.TREE.NODE_ID.INDEX;

export const useTreeMember = () => {
  const [loading, setLoading] = useState(true);
  const { member } = app.getState();
  const { params } = useMatch<'node_id', typeof path>({ path, end: false }) || {};
  const { node_id: nodeId } = params || {};

  useEffect(() => {
    app.getMember('tree', +nodeId!).finally(() => setLoading(false));
  }, [nodeId]);

  return [loading, member];
};
