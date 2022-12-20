import React, { FC } from 'react';
import { useMember } from '@hooks/useMember';
import { useStyles } from './tree.member.title.styles';

export const TreeMemberTitle: FC = () => {
  const { root, avatar } = useStyles();
  const { member_name: memberName } = useMember();

  return (
    <div className={root}>
      <div className={avatar} />
      {memberName}
    </div>
  );
};
