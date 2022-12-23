import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { NetViewKeys } from '@api/api/types/types';
import { RoutesMap } from '@constants/router.constants';
import { getMemberPosition, makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';
import { MemberStatus } from '@components/member/status/member.status';
import { useStyles } from './member.card.styles';

const { CIRCLE, TREE } = RoutesMap.NET.NET_ID;

interface MemberCardProps {
  netView: NetViewKeys;
  memberUiPosition: number;
}

export const MemberCard: FC<MemberCardProps> = (props) => {
  const { netView, memberUiPosition } = props;
  const memberPosition = getMemberPosition(netView, memberUiPosition);
  const { net, [netView]: netViewData } = app.getState();
  const member = netViewData[memberPosition];
  const { node_id: nodeId, member_name: memberName, memberStatus } = member || {};

  const { root, avatar, name, [memberStatus]: clsStatus } = useStyles();

  const navigate = useNavigate();
  const handleClick = useCallback(
    () =>
      netView === 'tree'
        ? navigate(makeDynamicPathname(TREE.NODE_ID.INDEX, net!.net_id, nodeId!))
        : navigate(makeDynamicPathname(CIRCLE.NODE_ID.INDEX, net!.net_id, nodeId!)),
    [navigate, net, netView, nodeId],
  );

  if (!member) return <div className={clsx(root, clsStatus)} aria-hidden="true" />;

  return (
    <div className={clsx(root, clsStatus)} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div className={name}>{memberName}</div>
      <MemberStatus memberStatus={memberStatus} />
    </div>
  );
};
