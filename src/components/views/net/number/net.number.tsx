import React, { FC } from 'react';
import { vars } from '@styles/vars';
import { AppState } from '@api/constants';
import { useSwap } from '@hooks/useSwap';
import { useUserNet } from '@hooks/useUserNet';
import { NotFound } from '@components/views/not.found/not.found';
import { app } from '@api/app/client.app';
import { NetTree } from '../net.view.ts/net.tree';
import { NetCircle } from '../net.view.ts/net.circle';
import { useStyles } from './net.number.styles';

const USER_NET_VIEW = ['tree', 'circle'] as const;
export type NetViewKeys = typeof USER_NET_VIEW[number];
const getViewStyle = (netView: NetViewKeys) => ({
  left: netView === 'tree' ? 0 : `calc(-100% - ${vars.gap.main}`,
});

export const NetMain: FC = () => {
  const { container, root } = useStyles();
  const [netView, handlers] = useSwap<NetViewKeys>([...USER_NET_VIEW]);
  const net = useUserNet();
  const { state } = app.getState();

  if (state === AppState.READY && !net) return <NotFound />;

  if (!net) return null;

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
