import { useCallback, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';

const path = RoutesMap.NET.NET_NUMBER.TREE.MEMBER;

export const useMember = () => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const { params } = useMatch<'node_id', typeof path>({ path }) || {};
  const { node_id: nodeId } = params || {};
  console.log('node', nodeId);
  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    // if (!nodeId) return navigateBack();
    // app.netMethods.enter(+netId).then((net) => {
    //   if (!net) return setNotFound(true);
    //   setNotFound(false);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

  return notFound;
};
