import React, { FC, useEffect } from 'react';
import { NetViewKeys, NET_VIEW_MAP } from '@api/api/types/types';
import { vars } from '@styles/vars';
import { useSwap } from '@hooks/useSwap';
import { NetCircle } from '@views/net/net.view/net.circle';
import { NetTree } from 'views/net/net.view/net.tree';
import { app } from '@api/app/client.app';
import { useStyles } from './net.id.styles';

const netViewStyle = {
  circle: { left: `calc(-100% - ${vars.gap.main}` },
  tree: { left: 0 },
};
const options = [...NET_VIEW_MAP] as const;

export const NetId: FC = () => {
  const { netView: initialNetView } = app.getState();
  const { container, root } = useStyles();
  const [netView, handlers] = useSwap<NetViewKeys>(options, initialNetView!);
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
