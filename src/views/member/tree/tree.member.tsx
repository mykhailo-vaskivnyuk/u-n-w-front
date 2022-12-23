import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';

const invitePath = RoutesMap.NET.NET_ID.TREE.NODE_ID.INVITE;
const connectedPath = RoutesMap.NET.NET_ID.TREE.NODE_ID.CONNECTED;

export const TreeMember: FC = () => {
  const { net } = app.getState();
  const { node_id: nodeId, memberStatus } = app.getState().memberData!;

  const navigate = useNavigate();
  const navigateToConnected = useCallback(
    () => navigate(makeDynamicPathname(connectedPath, net!.net_id, nodeId)),
    [navigate, net, nodeId],
  );
  const navigateToInvite = useCallback(
    () => navigate(makeDynamicPathname(invitePath, net!.net_id, nodeId)),
    [navigate, net, nodeId],
  );

  useEffect(() => {
    if (memberStatus === 'ACTIVE') return;
    if (memberStatus === 'CONNECTED') navigateToConnected();
    else navigateToInvite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

  return <div>TREE MEMBER ROOT</div>;
};
