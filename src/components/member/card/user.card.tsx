import React, { FC, useCallback } from 'react';
import { NetViewKeys } from '@api/api/types/types';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { app } from '@api/app/client.app';
import { useStyles } from './member.card.styles';

interface NetUserCardProps {
  netView: NetViewKeys;
}

export const UserCard: FC<NetUserCardProps> = (props) => {
  const { root, avatar, name } = useStyles();
  const { net } = app.getState();
  const { netView } = props;

  const navigate = useNavigateTo();
  const handleClick = useCallback(() => {
    const navigateTo = navigate.toNet(net!);
    netView === 'tree' ? navigateTo.treeUser() : navigateTo.circleUser();
  }, [navigate, net, netView]);

  return (
    <div className={root} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div className={name}>current user</div>
    </div>
  );
};
