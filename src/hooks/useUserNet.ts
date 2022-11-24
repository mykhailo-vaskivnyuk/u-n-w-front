import { useCallback, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';

export const useUserNet = () => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const path = makeDynamicPathname(RoutesMap.NET.NET_NUMBER.INDEX, ':net_id');
  const { params } = useMatch<'net_id', typeof path>({ path }) || {};
  const { net_id: netId } = params || {};
  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    if (!netId) return navigateBack();
    app.netMethods.enter(+netId).then((net) => {
      if (!net) return setNotFound(true);
      setNotFound(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netId]);

  return notFound;
};
