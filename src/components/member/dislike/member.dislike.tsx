import React, { FC, useCallback, MouseEvent } from 'react';
import clsx from 'clsx';
import { MemberStatusKeys } from '@server/constants';
import { app } from '@client/app';
import { useStyles } from './member.dislike.styles';

interface MemberDislikeProps {
  nodeId: number;
  memberStatus: MemberStatusKeys;
  dislike: boolean | null;
}

export const MemberDislike: FC<MemberDislikeProps> = (props) => {
  const { nodeId, memberStatus, dislike } = props;
  const { root, [memberStatus]: status } = useStyles();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      !dislike && app.member.data.setDislike(nodeId);
      dislike && app.member.data.unsetDislike(nodeId);
    },
    [dislike, nodeId],
  );

  return (
    <div className={clsx(root, status, { dislike })} onClick={handleClick} aria-hidden="true">
      <span>DISLIKE</span>
    </div>
  );
};
