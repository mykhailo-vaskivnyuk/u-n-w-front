import React, { FC } from 'react';
import { useStyles } from './net.styles';

export const Net: FC = () => {
  const { root, content } = useStyles();

  return (
    <div className={root}>
      <div className={content}>СПІЛЬНОТА</div>
    </div>
  );
};
