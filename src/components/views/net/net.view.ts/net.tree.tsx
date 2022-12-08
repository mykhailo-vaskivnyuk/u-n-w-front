import React, { FC } from 'react';
import { MemberCard } from '@components/member/member.card';
import { app } from '@api/app/client.app';
import { NetUserCard } from '@components/member/net.user.card';
import { useStyles } from '../number/net.number.styles';

export const NetTree: FC = () => {
  const { tree } = app.getState();
  const { netView: clsNetView, viewTitle } = useStyles();

  const treeJsx = new Array(7)
    .fill('circle')
    .map((i, j) =>
      j === 0 ? (
        <NetUserCard key={`${i + j}`} netView="tree" />
      ) : (
        <MemberCard key={`${i + j}`} netView="tree" member={tree[j - 1]} />
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
