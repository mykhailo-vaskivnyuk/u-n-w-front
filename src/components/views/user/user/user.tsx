import React, { FC } from 'react';
import { useStyles } from './user.styles';

export const User: FC = () => {
  const { root, content } = useStyles();

  return (
    <div className={root}>
      <div className={content}>УЧАСНИК</div>
    </div>
  );
};
