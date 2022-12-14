import React, { FC, useEffect } from 'react';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { app } from '@api/app/client.app';
import { FormContainer } from '@components/forms/form.container/form.container';
import { MemberConfirmForm } from '@components/forms/member/confirm/confirm';

export const TreeMemberConnected: FC = () => {
  const navigate = useNavigateTo();

  useEffect(() => {
    const { net, memberData } = app.getState();
    const { memberStatus, node_id: nodeId } = memberData!;
    if (memberStatus !== 'CONNECTED') navigate.toNet(net!).treeMember(nodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormContainer title="Confirm or Refuse Invite">
      <MemberConfirmForm />
    </FormContainer>
  );
};
