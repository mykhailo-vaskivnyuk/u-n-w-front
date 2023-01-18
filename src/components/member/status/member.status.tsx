import React, { FC } from 'react';
import clsx from 'clsx';
import { MemberStatusKeys } from '@api/constants';
import { useStyles } from './member.status.styles';

interface MemberStatusProps {
  memberStatus: MemberStatusKeys;
}

export const MemberStatus: FC<MemberStatusProps> = (props) => {
  const { memberStatus } = props;
  const { root, [memberStatus]: status } = useStyles();

  return (
    <div className={clsx(root, status)}>
      <span>{memberStatus}</span>
    </div>
  );
};
