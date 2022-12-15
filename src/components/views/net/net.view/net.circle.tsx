import React, { FC } from 'react';
import { MemberCard } from '@components/member/card/member.card';
import { app } from '@api/app/client.app';
import { NetUserCard } from '@components/member/card/net.user.card';
import { useStyles } from '../net.id/net.id.styles';

export const NetCircle: FC = () => {
  const { circle } = app.getState();
  const { netView: clsNetView, viewTitle } = useStyles();

  const circleJsx = new Array(7)
    .fill('circle')
    .map((i, j) =>
      j === 1 ? (
        <NetUserCard key={`${i + j}`} netView="circle" />
      ) : (
        <MemberCard key={`${i + j}`} netView="circle" member={circle[j] || null} />
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
