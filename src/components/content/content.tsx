import React, { FC, PropsWithChildren } from 'react';
import { useStyles } from './content.styles';

export const Content: FC<PropsWithChildren> = ({ children }) => {
  const { root } = useStyles();

  return <div className={root}>{children}</div>;
};
