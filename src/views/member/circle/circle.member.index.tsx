import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useNetMember } from '@hooks/useNetMember';
import { useStyles } from '../member.styles';

export const CircleMemberIndex: FC = () => {
  const { root } = useStyles();
  const member = useNetMember();
  if (!member) return null;

  return (
    <div className={root} aria-hidden="true">
      <Outlet />
    </div>
  );
};
