/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { useNetWaiting } from '@hooks/useNetWaiting';
import { WaitingItem } from './waiting.item/waiting.item';
import { useStyles } from './waiting.list.styles';

export const WaitingList: FC = () => {
  const { root, list } = useStyles();
  const waiting = useNetWaiting();

  const itemsJsx = waiting.map((item, i) => <WaitingItem key={i} {...item} />);

  return (
    <div className={root}>
      <div className={list}>{itemsJsx}</div>
    </div>
  );
};
