import clsx from 'clsx';
import React, { FC, PropsWithChildren } from 'react';
import { useStyles } from './message.styles';

export const Message: FC<PropsWithChildren<{ error?: boolean }>> = ({ error, children }) => {
  const { root } = useStyles();

  return (
    <div className={clsx(root, { error })}>
      <div>{children}</div>
    </div>
  );
};
