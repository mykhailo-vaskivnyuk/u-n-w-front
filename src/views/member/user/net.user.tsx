import React, { FC } from 'react';
import { useStyles } from '../member.styles';

export const NetUser: FC = () => {
  const { root } = useStyles();

  return (
    <div className={root} aria-hidden="true">
      <div>Я</div>
    </div>
  );
};
