import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useUserNet } from '@hooks/useUserNet';

export const NetIdIndex: FC = () => {
  const net = useUserNet();
  if (!net) return null;
  return <Outlet />;
};
