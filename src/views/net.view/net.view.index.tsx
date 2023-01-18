import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NetViewKeys } from '@api/api/types/net.types';
import { useNetView } from '@hooks/useNetView';
import { useTree } from '@hooks/useTree';
import { useCircle } from '@hooks/useCircle';

export const NetViewIndex: FC<{ netView: NetViewKeys }> = ({ netView }) => {
  useTree();
  useCircle();
  const curNetView = useNetView(netView);
  if (!curNetView) return null;
  return <Outlet key={Math.random()} />;
};
