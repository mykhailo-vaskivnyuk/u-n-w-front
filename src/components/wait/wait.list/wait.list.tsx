import React, { FC } from 'react';
import { useWaitNets } from '@hooks/useWaitNets';
import { WaitItem } from '../wait.item/wait.item';
import { useStyles } from './wait.list.styles';

// const NETS = [
//   { net_id: 1, name: 'Net name' },
//   { net_id: 2, name: 'Країна твого бажання' },
//   { net_id: 2, name: 'Країна твого бажання Країна твого бажання Країна твого бажання' },
// ];

export const WaitList: FC = () => {
  const { root, list } = useStyles();
  const waitNets = useWaitNets();

  const itemsJsx = waitNets.map((item) => <WaitItem {...item} />);

  return (
    <div className={root}>
      <div className={list}>{itemsJsx}</div>
    </div>
  );
};
