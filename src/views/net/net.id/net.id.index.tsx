import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useUserNet } from '@hooks/useUserNet';
import { useChanges } from '@hooks/useChanges';

export const NetIdIndex: FC = () => {
  const net = useUserNet();
  useChanges('net');
  if (!net) return null;
  return <Outlet key={Math.random()} />;
};
