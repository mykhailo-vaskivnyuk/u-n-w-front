import React, { FC, useCallback } from 'react';
import clsx from 'clsx';
import { app } from '@client/app';
import { useSwap } from '@hooks/useSwap';
import { useNetViewChange } from '@hooks/useNetViewChange';
import { NetCircle } from '@views/net/net.view/net.circle';
import { NetTree } from '@views/net/net.view/net.tree';
import { useStyles } from './net.id.styles';

export const NetId: FC = () => {
  const { container, root } = useStyles();
  const netView = useNetViewChange();

  const handleSwap = useCallback((value: boolean) => {
    const view = value ? 'circle' : 'tree';
    app.net.setView(view);
  }, []);

  const handlers = useSwap(handleSwap);

  return (
    <div className={container}>
      <div className={clsx(root, netView === 'tree' ? 'tree' : 'circle')} {...handlers}>
        <NetTree />
        <NetCircle />
      </div>
    </div>
  );
};
