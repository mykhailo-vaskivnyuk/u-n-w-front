import React, { FC } from 'react';
import { useMember } from '@hooks/useMember';
import { useStyles } from './member.card.styles';

export const MemberCircle: FC = () => {
  const { root, avatar } = useStyles();
  useMember();

  return (
    <div className={root} aria-hidden="true">
      <div className={avatar} />
      <div>MEMBER ROOT</div>
    </div>
  );
};
