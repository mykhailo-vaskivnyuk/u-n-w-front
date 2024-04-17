import React, { FC, useEffect } from 'react';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { app } from '@client/app';

export const TreeMember: FC = () => {
  const navigate = useNavigateTo();

  useEffect(() => {
    const { net, memberData } = app.getState();
    const { memberStatus, node_id: nodeId } = memberData!;
    if (memberStatus === 'ACTIVE') return;
    if (memberStatus === 'FREE') return;
    const navigateTo = navigate.toNet(net!);
    if (memberStatus === 'CONNECTED') navigateTo.connected(nodeId);
    else navigateTo.invite(nodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Учасник дерева</div>;
};
