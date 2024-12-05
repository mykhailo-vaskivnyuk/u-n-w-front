import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useTree } from '@hooks/useTree';
import { useNetMember } from '@hooks/useNetMember';
import { MemberTitle } from '@components/member/title/member.title';
import { useStyles } from '../member.styles';

export const TreeMemberIndex: FC = () => {
  useTree();
  const { root, content } = useStyles();
  const member = useNetMember();
  if (!member) return null;

  return (
    <div className={root} aria-hidden="true">
      <MemberTitle />
      <div className={content}>
        <Outlet key={Math.random()} />
      </div>
    </div>
  );
};
