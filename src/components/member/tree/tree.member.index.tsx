import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useTreeMember } from '@hooks/useTreeMember';
import { NotFound } from '@components/views/not.found/not.found';

export const TreeMemberIndex: FC = () => {
  const [loading, member] = useTreeMember();
  if (loading) return null;
  if (!member) return <NotFound />;

  return <Outlet />;
};
