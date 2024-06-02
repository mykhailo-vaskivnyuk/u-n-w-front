import React, { FC } from 'react';
import { INetWaiting } from '@app/common/server/types/net.types';
import { useStyles } from './waiting.item.styles';

export const WaitingItem: FC<INetWaiting> = (props) => {
  const { root } = useStyles();
  const { name, comment } = props;

  return (
    <li className={root}>
      <span>{name}</span>
      <span>{comment}</span>
    </li>
  );
};
