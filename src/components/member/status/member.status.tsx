import React, { FC } from 'react';
import clsx from 'clsx';
import { MemberStatusKeys } from '@server/constants';
import { MEMBER_STATUS_TEXT } from '@constants/dictionary';
import { useStyles } from './member.status.styles';

interface MemberStatusProps {
  memberStatus: MemberStatusKeys;
}

export const MemberStatus: FC<MemberStatusProps> = (props) => {
  const { memberStatus } = props;
  const { root, [memberStatus]: status } = useStyles();

  return (
    <div className={clsx(root, status)}>
      <span>{MEMBER_STATUS_TEXT[memberStatus]}</span>
    </div>
  );
};
