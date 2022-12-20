import React, { FC } from 'react';
import { vars } from '@styles/vars';
import { NetViewKeys, NET_VIEW_MAP } from '@api/api/types/net.types';
import { useSwap } from '@hooks/useSwap';
import { NetCircle } from '../net.view/net.circle';
import { NetTree } from '../net.view/net.tree';
import { useStyles } from './net.id.styles';

const getViewStyle = (netView: NetViewKeys) => ({
  left: netView === 'tree' ? 0 : `calc(-100% - ${vars.gap.main}`,
});

export const NetId: FC = () => {
  const { container, root } = useStyles();
  const [netView, handlers] = useSwap<NetViewKeys>([...NET_VIEW_MAP]);

  const style = getViewStyle(netView);

  return (
    <div className={container}>
      <div className={root} style={style} {...handlers}>
        <NetTree />
        <NetCircle />
      </div>
    </div>
  );
};
