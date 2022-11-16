import { FC, useEffect } from 'react';
import { app } from '@api/app/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoutesMap } from '@components/router/constants';

export const NetEnter: FC = () => {
  const navigate = useNavigate();
  const path = RoutesMap.NET.ENTER.replace('*', ':net_id');
  const { params } = useMatch<'net_id', typeof path>({ path }) || {};

  const navigateToIndex = () => navigate(RoutesMap.INDEX, { replace: true });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { net_id } = params || {};
    if (!net_id) return navigateToIndex();
    app.netMethods
      .enter(+net_id)
      .then(() => navigateToIndex())
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
