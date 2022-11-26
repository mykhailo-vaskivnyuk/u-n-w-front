import React, { FC } from 'react';
import { vars } from '@styles/vars';
import { NotFound } from '@components/views/not.found/not.found';
import { Member } from '@components/member/member';
import { useSwap } from '@hooks/useSwap';
import { useUserNet } from '../../../../hooks/useUserNet';
import { useStyles } from './net.number.styles';
import clsx from 'clsx';

const USER_NET_POSITION = ['tree', 'circle'] as const;
type UserNetPositionKeys = typeof USER_NET_POSITION[number];

export const NetMain: FC = () => {
  const { container, root, netView: clsNetView, viewButton, tree, circle } = useStyles();
  // const [netView, setNetView] = useState<UserNetPositionKeys>('tree');
  const [netView, handlers] = useSwap<UserNetPositionKeys>([...USER_NET_POSITION]);
  const notFound = useUserNet();
  if (notFound) return <NotFound />;

  const membersTree = new Array(7)
    .fill('tree')
    .map((i, j) => (
      <Member key={`${i + j}`} name={j === 0 ? 'current user' : `${i} member ${j}`} />
    ));

  const membersCircle = new Array(7)
    .fill('circle')
    .map((i, j) => (
      <Member key={`${i + j}`} name={j === 1 ? 'current user' : `${i} member ${j}`} />
    ));

  return (
    <div className={container}>
      <div
        className={root}
        style={{ left: netView === 'tree' ? 0 : `calc(-100% - ${vars.gap.main}` }}
        {...handlers}
      >
        <div className={clsx(clsNetView, viewButton)}>
          {/* <IconButton
            icon={ICONS.arrowRight}
            iconPosition="left"
            className={viewButton}
            onClick={() => setNetView('circle')}
          >
            SWITCH to CIRCLE
          </IconButton> */}
          <div className={viewButton}>TREE MODE</div>
          {membersTree}
        </div>
        <div className={circle}>
          {membersCircle}
          {/* <IconButton
            icon={ICONS.arrowLeft}
            iconPosition="right"
            className={viewButton}
            onClick={() => setNetView('tree')}
          >
            SWITCH to TREE
          </IconButton> */}
          <div className={viewButton}>CIRCLE MODE</div>
        </div>
      </div>
    </div>
  );
};
