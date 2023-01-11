/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { useTree } from '@hooks/useTree';
import { MemberCard } from '@components/member/card/member.card';
import { UserCard } from '@components/member/card/user.card';
import { NetViewMenu } from '@components/menu/net.view.menu/net.view.menu';
import { useStyles } from './net.view.styles';

export const NetTree: FC = () => {
  useTree();
  const { root } = useStyles();

  const treeJsx = new Array(7)
    .fill('tree')
    .map((i, j) =>
      j === 0 ? (
        <UserCard key={`tree-${j}`} netView="tree" />
      ) : (
        <MemberCard key={`tree-${j}`} netView="tree" memberUiPosition={j} />
      ),
    );

  return (
    <div className={root}>
      <NetViewMenu netView="tree" />
      {treeJsx}
    </div>
  );
};
