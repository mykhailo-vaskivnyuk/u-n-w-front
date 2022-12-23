import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useTree } from '@hooks/useTree';
import { useNetMember } from '@hooks/useNetMember';
import { NotFound } from '@views/not.found/not.found';
import { MemberTitle } from '@components/member/title/member.title';
import { useStyles } from '../member.styles';

export const TreeMemberIndex: FC = () => {
  useTree();
  const { root, content } = useStyles();
  const [loading, member] = useNetMember('tree');
  if (loading) return null;
  if (!member) return <NotFound />;

  return (
    <div className={root} aria-hidden="true">
      <MemberTitle />
      <div className={content}>
        <Outlet key={Math.random()} />
      </div>
    </div>
  );
};
