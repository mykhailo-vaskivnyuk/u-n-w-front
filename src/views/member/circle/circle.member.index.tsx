import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useNetMember } from '@hooks/useNetMember';
import { NotFound } from '@views/not.found/not.found';
import { useStyles } from '../member.styles';

export const CircleMemberIndex: FC = () => {
  const { root } = useStyles();
  const [loading, member] = useNetMember('circle');
  if (loading) return null;
  if (!member) return <NotFound />;

  return (
    <div className={root} aria-hidden="true">
      <Outlet />
    </div>
  );
};
