import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NetViewKeys } from '@components/views/net/number/net.number';
import { makeDynamicPathname } from '@utils/utils';
import { RoutesMap } from '@constants/router.constants';
import { app } from '@api/app/client.app';
import { useStyles } from './member.card.styles';

interface NetUserCardProps {
  netView: NetViewKeys;
}

export const NetUserCard: FC<NetUserCardProps> = (props) => {
  const { root, avatar } = useStyles();
  const { net } = app.getState();
  const { netView } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(
    () =>
      netView === 'tree'
        ? navigate(makeDynamicPathname(RoutesMap.NET.NET_NUMBER.TREE.USER, net!.net_id))
        : navigate(makeDynamicPathname(RoutesMap.NET.NET_NUMBER.CIRCLE.USER, net!.net_id)),
    [navigate, net, netView],
  );

  // const title = token ? 'inviting' : name || 'empty';

  return (
    <div className={root} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div>current user</div>
    </div>
  );
};
