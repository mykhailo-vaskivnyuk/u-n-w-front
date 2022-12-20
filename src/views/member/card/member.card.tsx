import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NetViewKeys } from '@api/api/types/net.types';
import { getMemberName, getMemberPosition, makeDynamicPathname } from '@utils/utils';
import { RoutesMap } from '@constants/router.constants';
import { app } from '@api/app/client.app';
import { useStyles } from './member.card.styles';

const { CIRCLE, TREE } = RoutesMap.NET.NET_ID;

interface MemberCardProps {
  netView: NetViewKeys;
  memberUiPosition: number;
}

export const MemberCard: FC<MemberCardProps> = (props) => {
  const { root, avatar } = useStyles();
  const { netView, memberUiPosition } = props;
  const memberPosition = getMemberPosition(netView, memberUiPosition);
  const { net, [netView]: netViewData } = app.getState();
  const member = netViewData[memberPosition];
  const { node_id: nodeId, name, token } = member || {};

  const navigate = useNavigate();
  const handleClick = useCallback(
    () =>
      netView === 'tree'
        ? navigate(makeDynamicPathname(TREE.NODE_ID.INDEX, net!.net_id, nodeId!))
        : navigate(makeDynamicPathname(CIRCLE.NODE_ID.INDEX, net!.net_id, nodeId!)),
    [navigate, net, netView, nodeId],
  );

  if (!member) return <div className={root} aria-hidden="true" />;

  const memberName = getMemberName(netView, member, memberPosition);
  const status = token ? 'inviting' : (name && '') || 'empty';

  return (
    <div className={root} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div>{memberName}</div>
      <div>{status}</div>
    </div>
  );
};
