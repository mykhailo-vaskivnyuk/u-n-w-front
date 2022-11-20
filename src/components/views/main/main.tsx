import React, { FC } from 'react';
import { useStyles } from './main.styles';

export const Main: FC = () => {
  const { root, content } = useStyles();

  return (
    <div className={root}>
      <div className={content}>ROOT PAGE</div>
    </div>
  );
};
