import React, { FC, useEffect } from 'react';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { app } from '@api/app/client.app';

export const TreeMember: FC = () => {
  const navigate = useNavigateTo();

  useEffect(() => {
    const { net, memberData } = app.getState();
    const { memberStatus, node_id: nodeId } = memberData!;
    if (memberStatus === 'ACTIVE') return;
    const navigateTo = navigate.toNet(net!);
    if (memberStatus === 'CONNECTED') navigateTo.connected(nodeId);
    else navigateTo.invite(nodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>TREE MEMBER ROOT</div>;
};
