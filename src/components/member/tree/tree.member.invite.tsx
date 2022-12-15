import React, { FC } from 'react';
import { useStyles } from '../member.styles';

export const TreeMemberInvite: FC = () => {
  const { root } = useStyles();

  return (
    <div className={root} aria-hidden="true">
      <div>INVITE MEMBER</div>
    </div>
  );
};
