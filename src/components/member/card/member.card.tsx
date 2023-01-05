import React, { FC, useCallback, MouseEvent } from 'react';
import clsx from 'clsx';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { useMemberCard } from '@hooks/useMemberCard';
import { MemberStatus } from '@components/member/status/member.status';
import { MemberCardProps } from './member.card.types';
import { MemberDislike } from '../dislike/member.dislike';
import { MemberVote } from '../vote/member.vote';
import { useStyles } from './member.card.styles';

export const MemberCard: FC<MemberCardProps> = (props) => {
  const { netView } = props;
  const [net, member, memberPosition] = useMemberCard(props);
  const {
    node_id: nodeId,
    member_name: memberName,
    memberStatus = 'UNAVAILABLE',
    dislike,
    vote,
    vote_count: voteCount,
  } = member || {};
  const { root, avatar, name, [memberStatus]: clsStatus } = useStyles();

  const navigate = useNavigateTo();
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.isDefaultPrevented()) return;
      const navigateTo = navigate.toNet(net!);
      netView === 'tree' ? navigateTo.treeMember(nodeId) : navigateTo.circleMember(nodeId);
    },
    [navigate, net, netView, nodeId],
  );

  if (!member) return <div className={clsx(root, clsStatus)} aria-hidden="true" />;

  return (
    <div className={clsx(root, clsStatus)} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div className={name}>{memberName}</div>
      <MemberStatus memberStatus={memberStatus} />
      <MemberDislike nodeId={nodeId} memberStatus={memberStatus} dislike={dislike} />
      <MemberVote
        nodeId={nodeId}
        memberPosition={memberPosition}
        memberStatus={memberStatus}
        vote={vote}
        voteCount={voteCount}
        netView={netView}
      />
    </div>
  );
};
