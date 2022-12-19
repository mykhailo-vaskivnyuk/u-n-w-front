/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { MemberCard } from '@components/member/card/member.card';
import { NetUserCard } from '@components/member/card/net.user.card';
import { useStyles } from '../net.id/net.id.styles';

export const NetTree: FC = () => {
  const { netView: clsNetView, viewTitle } = useStyles();

  const treeJsx = new Array(7)
    .fill('tree')
    .map((i, j) =>
      j === 0 ? (
        <NetUserCard key={`tree-${j}`} netView="tree" />
      ) : (
        <MemberCard key={`tree-${j}`} netView="tree" memberUiPosition={j} />
      ),
    );

  return (
    <div className={clsNetView}>
      {/* <IconButton
            icon={ICONS.arrowRight}
            iconPosition="left"
            className={viewButton}
            onClick={() => setNetView('circle')}
          >
            SWITCH to CIRCLE
          </IconButton> */}
      <div className={viewTitle}>TREE MODE</div>
      {treeJsx}
    </div>
  );
};
