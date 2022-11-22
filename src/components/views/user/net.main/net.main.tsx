import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { vars } from '@styles/vars';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useUserNet } from './useUserNet';
import { useStyles } from './net.main.styles';

const USER_NET_POSITION = ['tree', 'circle'] as const;
type UserNetPositionKeys = typeof USER_NET_POSITION[number];

export const NetMain: FC = () => {
  useUserNet();
  const {
    container,
    root,
    menu,
    member,
    netView: clsNetView,
    viewButton,
    tree,
    circle,
  } = useStyles();
  const [netView, setNetView] = useState<UserNetPositionKeys>('tree');
  const membersTree = new Array(7).fill('tree').map((i, j) => (
    <div key={`${i + j}`} className={member}>
      {j === 0 ? 'current user' : `${i} member ${j}`}
    </div>
  ));
  const membersCircle = new Array(7).fill('circle').map((i, j) => (
    <div key={`${i + j}`} className={member}>
      {j === 1 ? 'current user' : `${i} member ${j}`}
    </div>
  ));

  return (
    <div className={container}>
      <div className={menu}>member menu</div>
      <div
        className={root}
        style={{ left: netView === 'tree' ? 0 : `calc(-100% - ${vars.gap.main}` }}
      >
        <div className={clsx(clsNetView, tree)}>
          <IconButton
            icon={ICONS.arrowLeft}
            iconPosition="left"
            className={viewButton}
            onClick={() => setNetView('circle')}
          >
            SWITCH to CIRCLE
          </IconButton>
          {membersTree}
        </div>
        <div className={clsx(clsNetView, circle)}>
          {membersCircle}
          <IconButton
            icon={ICONS.arrowLeft}
            iconPosition="right"
            className={viewButton}
            onClick={() => setNetView('tree')}
          >
            SWITCH to TREE
          </IconButton>
        </div>
      </div>
    </div>
  );
};
