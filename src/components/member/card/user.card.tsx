import React, { FC, useCallback, MouseEvent } from 'react';
import { NetViewKeys } from '@api/api/types/types';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { app } from '@api/app/client.app';
import { MemberVote } from '../vote/member.vote';
import { useStyles } from './member.card.styles';

interface NetUserCardProps {
  netView: NetViewKeys;
}

export const UserCard: FC<NetUserCardProps> = (props) => {
  const { root, avatar, name } = useStyles();
  const { net, userNetData } = app.getState();
  const { node_id: nodeId, token, vote, vote_count: voteCount } = userNetData!;
  const memberStatus = token ? 'CONNECTED' : 'ACTIVE';
  const { netView } = props;

  const navigate = useNavigateTo();
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.isDefaultPrevented()) return;
      const navigateTo = navigate.toNet(net!);
      netView === 'tree' ? navigateTo.treeUser() : navigateTo.circleUser();
    },
    [navigate, net, netView],
  );

  return (
    <div className={root} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div className={name}>current user</div>
      <MemberVote
        nodeId={nodeId}
        memberPosition={Infinity}
        memberStatus={memberStatus}
        vote={vote}
        voteCount={voteCount}
        netView={netView}
      />
    </div>
  );
};
