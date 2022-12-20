import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { useMember } from '@hooks/useMember';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';

const invitePath = RoutesMap.NET.NET_ID.TREE.NODE_ID.INVITE;

export const TreeMember: FC = () => {
  const { net } = app.getState();
  const { name, node_id: nodeId } = useMember();

  const navigate = useNavigate();
  const navigateToInvite = useCallback(
    () => navigate(makeDynamicPathname(invitePath, net!.net_id, nodeId)),
    [navigate, net, nodeId],
  );

  useEffect(() => {
    if (!name) navigateToInvite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

  return <div>TREE MEMBER ROOT</div>;
};
