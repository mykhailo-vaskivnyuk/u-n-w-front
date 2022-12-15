import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useUserNet } from '@hooks/useUserNet';
import { NotFound } from '@components/views/not.found/not.found';

export const NetIdIndex: FC = () => {
  const [loading, net] = useUserNet();
  if (loading) return null;
  if (!net) return <NotFound />;
  return <Outlet />;
};
