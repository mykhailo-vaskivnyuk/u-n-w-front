/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { useCircle } from '@hooks/useCircle';
import { MemberCard } from '@components/member/card/member.card';
import { UserCard } from '@components/member/card/user.card';
import { useStyles } from './net.view.styles';

export const NetCircle: FC = () => {
  useCircle();
  const { root, viewTitle } = useStyles();

  const circleJsx = new Array(7)
    .fill('circle')
    .map((i, j) =>
      j === 1 ? (
        <UserCard key={`circle-${j}`} netView="circle" />
      ) : (
        <MemberCard key={`circle-${j}`} netView="circle" memberUiPosition={j} />
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
      {circleJsx}
      <div className={viewTitle}>CIRCLE VIEW</div>
    </div>
  );
};
