/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { MemberCard } from '@components/member/card/member.card';
import { NetUserCard } from '@components/member/card/net.user.card';
import { useStyles } from '../net.id/net.id.styles';

export const NetCircle: FC = () => {
  const { netView: clsNetView, viewTitle } = useStyles();

  const circleJsx = new Array(7)
    .fill('circle')
    .map((i, j) =>
      j === 1 ? (
        <NetUserCard key={`circle-${j}`} netView="circle" />
      ) : (
        <MemberCard key={`circle-${j}`} netView="circle" memberUiPosition={j} />
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
      <div className={viewTitle}>CIRCLE MODE</div>
      {circleJsx}
    </div>
  );
};
