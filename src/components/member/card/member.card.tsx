import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMemberResponse, NetViewKeys } from '@api/api/types/net.types';
import { makeDynamicPathname } from '@utils/utils';
import { RoutesMap } from '@constants/router.constants';
import { app } from '@api/app/client.app';
import { useStyles } from './member.card.styles';

interface MemberCardProps {
  netView: NetViewKeys;
  member: IMemberResponse | null;
}

export const MemberCard: FC<MemberCardProps> = (props) => {
  const { root, avatar } = useStyles();
  const { net } = app.getState();
  const { member, netView } = props;
  const { node_id: nodeId, name, token } = member || {};
  const navigate = useNavigate();

  const handleClick = useCallback(
    () =>
      netView === 'tree'
        ? navigate(
            makeDynamicPathname(RoutesMap.NET.NET_ID.TREE.NODE_ID.INDEX, net!.net_id, nodeId!),
          )
        : navigate(
            makeDynamicPathname(RoutesMap.NET.NET_ID.CIRCLE.NODE_ID.INDEX, net!.net_id, nodeId!),
          ),
    [navigate, net, netView, nodeId],
  );

  if (!member) return <div className={root} aria-hidden="true" />;

  const title = token ? 'inviting' : name || 'empty';

  return (
    <div className={root} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div>{title}</div>
    </div>
  );
};
