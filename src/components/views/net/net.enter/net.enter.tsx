import { FC, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { app } from '@api/app/client.app';

export const NetEnter: FC = () => {
  const navigate = useNavigate();
  const path = RoutesMap.NET.ENTER.replace('*', ':net_id');
  const { params } = useMatch<'net_id', typeof path>({ path }) || {};

  const navigateToIndex = () => navigate(RoutesMap.INDEX, { replace: true });

  useEffect(() => {
    const { net_id: netId } = params || {};
    if (!netId) return navigateToIndex();
    app.netMethods.enter(+netId).then(navigateToIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
