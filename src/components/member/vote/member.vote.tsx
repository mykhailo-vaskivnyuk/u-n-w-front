import React, { FC, useCallback, MouseEvent } from 'react';
import clsx from 'clsx';
import { MemberStatusKeys, NetViewKeys } from '@api/api/types/types';
import { app } from '@api/app/client.app';
import { useStyles } from './member.vote.styles';

interface MemberDislikeProps {
  nodeId: number;
  memberStatus: MemberStatusKeys;
  memberPosition: number;
  vote: boolean | null;
  voteCount: number;
  netView: NetViewKeys;
}

export const MemberVote: FC<MemberDislikeProps> = (props) => {
  const { nodeId, memberStatus, memberPosition, vote, voteCount, netView } = props;
  const { root, [memberStatus]: status } = useStyles();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      !vote && app.member.data.setVote(nodeId);
      vote && app.member.data.unsetVote(nodeId);
    },
    [vote, nodeId],
  );

  if (netView === 'tree') return null;

  return (
    <div
      className={clsx(root, status, { vote }, { voteCount }, { memberPosition })}
      onClick={handleClick}
      aria-hidden="true"
    >
      <span>{voteCount} VOTES</span>
    </div>
  );
};
