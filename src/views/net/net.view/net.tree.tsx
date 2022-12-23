/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { MemberCard } from '@components/member/card/member.card';
import { UserCard } from '@components/member/card/user.card';
import { useStyles } from './net.view.styles';

export const NetTree: FC = () => {
  const { root, viewTitle } = useStyles();

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
      {/* <IconButton
            icon={ICONS.arrowRight}
            iconPosition="left"
            className={viewButton}
            onClick={() => setNetView('circle')}
          >
            SWITCH to CIRCLE
          </IconButton> */}
      <div className={viewTitle}>TREE VIEW</div>
      {treeJsx}
    </div>
  );
};
