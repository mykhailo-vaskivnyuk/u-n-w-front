import React, { FC } from 'react';
import clsx from 'clsx';
import { MemberStatusKeys } from '@api/api/types/types';
import { useStyles } from './member.status.styles';

export const MemberStatus: FC<{ memberStatus: MemberStatusKeys }> = ({ memberStatus }) => {
  const { root, [memberStatus]: status } = useStyles();

  return (
    <div className={clsx(root, status)}>
      <span>{memberStatus}</span>
    </div>
  );
};
