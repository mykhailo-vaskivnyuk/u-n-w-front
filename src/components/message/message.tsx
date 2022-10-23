import React, { FC, PropsWithChildren } from 'react';
import { useStyles } from './message.styles';

export const Message: FC<PropsWithChildren> = ({ children }) => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <div>{children}</div>
    </div>
  );
};
