import React, { FC } from 'react';
import { useWaitNets } from '@hooks/useWaitNets';
import { WaitItem } from './wait.item/wait.item';
import { useStyles } from './wait.list.styles';

export const WaitList: FC = () => {
  const { root, list } = useStyles();
  const { waitNets, onRemove } = useWaitNets();

  const itemsJsx = waitNets.map((item) => (
    <WaitItem key={item.net_id} {...item} onRemove={onRemove} />
  ));

  return (
    <div className={root}>
      <div className={list}>{itemsJsx}</div>
    </div>
  );
};
