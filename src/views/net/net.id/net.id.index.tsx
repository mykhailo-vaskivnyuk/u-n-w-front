import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useUserNet } from '@hooks/useUserNet';
import { useEvents } from '@hooks/useEvents';

export const NetIdIndex: FC = () => {
  const net = useUserNet();
  useEvents('net');
  if (!net) return null;
  return <Outlet key={Math.random()} />;
};
