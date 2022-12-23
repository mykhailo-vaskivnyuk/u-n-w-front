import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';
import { FormContainer } from '@components/forms/form.container/form.container';
import { MemberConfirmForm } from '@components/forms/member/confirm/confirm';

const memberPath = RoutesMap.NET.NET_ID.TREE.NODE_ID.INDEX;

export const TreeMemberConnected: FC = () => {
  const { net, memberData } = app.getState();
  const { node_id: nodeId, memberStatus } = memberData!;

  const navigate = useNavigate();
  const navigateToMember = useCallback(
    () => navigate(makeDynamicPathname(memberPath, net!.net_id, nodeId)),
    [navigate, net, nodeId],
  );

  useEffect(() => {
    if (memberStatus !== 'CONNECTED') navigateToMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

  return (
    <FormContainer title="Confirm or Refuse Invite">
      <MemberConfirmForm />
    </FormContainer>
  );
};
