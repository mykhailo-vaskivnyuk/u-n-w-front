import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { NetViewKeys, NET_VIEW_MAP } from '@api/api/types/types';
import { vars } from '@styles/vars';
import { useSwap } from '@hooks/useSwap';
import { NetCircle } from '../net.view/net.circle';
import { NetTree } from '../net.view/net.tree';
import { useStyles } from './net.id.styles';

const netViewStyle = {
  circle: { left: `calc(-100% - ${vars.gap.main}` },
  tree: { left: 0 },
};
const options = [...NET_VIEW_MAP] as const;

export const NetId: FC = () => {
  const { state: initialNetView } = useLocation();
  const { container, root } = useStyles();
  const [netView, handlers] = useSwap<NetViewKeys>(options, initialNetView);
  const style = netViewStyle[netView];

  return (
    <div className={container}>
      <div className={root} style={style} {...handlers}>
        <NetTree />
        <NetCircle />
      </div>
    </div>
  );
};
