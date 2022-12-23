import React, { FC } from 'react';
import { app } from '@api/app/client.app';
import { useStyles } from './tree.member.title.styles';

export const TreeMemberTitle: FC = () => {
  const { root, avatar } = useStyles();
  const { member_name: memberName } = app.getState().memberData!;

  return (
    <div className={root}>
      <div className={avatar} />
      {memberName}
    </div>
  );
};
