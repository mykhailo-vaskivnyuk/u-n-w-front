import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';
import { useStyles } from '../member.styles';

const invitePath = RoutesMap.NET.NET_ID.TREE.NODE_ID.INVITE;

export const TreeMember: FC = () => {
  const { root } = useStyles();
  const { member, net } = app.getState();

  const navigate = useNavigate();
  const navigateToInvite = useCallback(
    () => navigate(makeDynamicPathname(invitePath, net!.net_id, member!.node_id)),
    [member, navigate, net],
  );

  useEffect(() => {
    if (member && !member.name) navigateToInvite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  return (
    <div className={root} aria-hidden="true">
      <div>MEMBER ROOT</div>
    </div>
  );
};
