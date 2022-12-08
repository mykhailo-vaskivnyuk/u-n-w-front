import { useCallback, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { app } from '@api/app/client.app';
import { useNet } from './useNet';

const path = RoutesMap.NET.NET_NUMBER.INDEX;

export const useUserNet = () => {
  const navigate = useNavigate();
  const [net] = useNet();
  const { params } = useMatch<'net_id', typeof path>({ path }) || {};
  const { net_id: strNetId } = params || {};
  const netId = strNetId ? +strNetId : undefined;
  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    if (!netId) return navigateBack();
    if (net && net.net_id === netId) return;
    app.netMethods.enter(netId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netId]);

  return net;
};
