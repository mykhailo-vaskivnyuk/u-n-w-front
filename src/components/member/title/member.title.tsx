import React, { FC } from 'react';
import { app } from '@api/app/client.app';
import { useStyles } from './member.title.styles';

export const MemberTitle: FC = () => {
  const { root, avatar } = useStyles();
  const { member_name: memberName } = app.getState().memberData!;

  return (
    <div className={root}>
      <div className={avatar} />
      {memberName}
    </div>
  );
};
