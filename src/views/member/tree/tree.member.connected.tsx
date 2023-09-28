import React, { FC, useEffect } from 'react';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { app } from '@client/app';
import { FormContainer } from '@components/containers/form.container';
import { MemberConfirmForm } from '@components/forms/member/confirm/confirm';

export const TreeMemberConnected: FC = () => {
  const navigate = useNavigateTo();

  useEffect(() => {
    const { net, memberData } = app.getState();
    const { memberStatus, node_id: nodeId } = memberData!;
    if (memberStatus === 'CONNECTED') return;
    navigate.toNet(net!).treeMember(nodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormContainer title="Confirm or Refuse Invite">
      <MemberConfirmForm />
    </FormContainer>
  );
};
