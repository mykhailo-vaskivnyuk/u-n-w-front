import React, { FC } from 'react';
import { useStyles } from '../member.styles';

export const CircleMember: FC = () => {
  const { root } = useStyles();

  return (
    <div className={root} aria-hidden="true">
      <div>MEMBER ROOT</div>
    </div>
  );
};
