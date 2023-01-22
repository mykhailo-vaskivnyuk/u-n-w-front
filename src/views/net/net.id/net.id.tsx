import React, { FC, useEffect } from 'react';
import { NetViewEnum } from '@api/api/types/types';
import { vars } from '@styles/vars';
import { useSwap } from '@hooks/useSwap';
import { NetCircle } from '@views/net/net.view/net.circle';
import { NetTree } from 'views/net/net.view/net.tree';
import { app } from '@api/app/client.app';
import { useStyles } from './net.id.styles';

const netViewStyle = {
  tree: { left: 0 },
  circle: { left: `calc(-100% - ${vars.gap.main}` },
};
const options = ['tree', 'circle'] as const;

export const NetId: FC = () => {
  const { netView: initialNetView } = app.getState();
  const { container, root } = useStyles();
  const [netView, handlers] = useSwap<NetViewEnum>(options, initialNetView!);
  const style = netViewStyle[netView];

  useEffect(() => app.net.setView(netView), [netView]);

  return (
    <div className={container}>
      <div className={root} style={style} {...handlers}>
        <NetTree />
        <NetCircle />
      </div>
    </div>
  );
};
