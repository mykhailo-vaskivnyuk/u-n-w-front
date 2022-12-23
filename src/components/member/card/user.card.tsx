import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NetViewKeys } from '@api/api/types/types';
import { RoutesMap } from '@constants/router.constants';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';
import { useStyles } from './member.card.styles';

interface NetUserCardProps {
  netView: NetViewKeys;
}

export const UserCard: FC<NetUserCardProps> = (props) => {
  const { root, avatar, name } = useStyles();
  const { net } = app.getState();
  const { netView } = props;

  const navigate = useNavigate();
  const handleClick = useCallback(
    () =>
      netView === 'tree'
        ? navigate(makeDynamicPathname(RoutesMap.NET.NET_ID.TREE.USER, net!.net_id))
        : navigate(makeDynamicPathname(RoutesMap.NET.NET_ID.CIRCLE.USER, net!.net_id)),
    [navigate, net, netView],
  );

  return (
    <div className={root} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div className={name}>current user</div>
    </div>
  );
};
