import { FC, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';

export const NetEnter: FC = () => {
  const navigate = useNavigate();
  const path = makeDynamicPathname(RoutesMap.NET.ENTER, ':net_id');
  const { params } = useMatch<'net_id', typeof path>({ path }) || {};

  const navigateToNet = (netId: number) => navigate(makeDynamicPathname(RoutesMap.USER.NET, netId));
  const navigateBack = () => navigate(-1);

  useEffect(() => {
    const { net_id: netId } = params || {};
    if (!netId) return navigateBack();
    app.netMethods.enter(+netId).then((net) => {
      if (net) return navigateToNet(+netId);
      navigateBack();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
