import React, { FC } from 'react';
import { useUser } from '@hooks/useUser';
import { useStyles } from './member.card.styles';

export const NetUser: FC = () => {
  const { root, avatar } = useStyles();
  const user = useUser();

  return (
    <div className={root} aria-hidden="true">
      <div className={avatar} />
      <div>NET USER ROOT</div>
    </div>
  );
};
