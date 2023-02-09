import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NetViewEnum } from '@server/types/net.types';
import { useNetView } from '@hooks/useNetView';
import { useTree } from '@hooks/useTree';
import { useCircle } from '@hooks/useCircle';

export const NetViewIndex: FC<{ netView: NetViewEnum }> = ({ netView }) => {
  useNetView(netView);
  useTree();
  useCircle();
  return <Outlet key={Math.random()} />;
};
