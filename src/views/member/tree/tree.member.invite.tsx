import React, { FC, useEffect } from 'react';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { app } from '@client/app';
import { MemberInviteCreateForm } from '@components/forms/member/invite/invite.create';
import { MemberInviteCancelForm } from '@components/forms/member/invite/invite.cancel';
import { FormContainer } from '@components/containers/form.container';

export const TreeMemberInvite: FC = () => {
  const navigate = useNavigateTo();
  const { net, memberData } = app.getState();
  const { node_id: nodeId, memberStatus } = memberData!;

  useEffect(() => {
    if (memberStatus === 'INVITED') return;
    if (memberStatus === 'EMPTY') return;
    navigate.toNet(net!).treeMember(nodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberData]);

  return memberStatus === 'INVITED' ? (
    <FormContainer title="Cancel Invite">
      <MemberInviteCancelForm />
    </FormContainer>
  ) : (
    <FormContainer title="Invite Member">
      <MemberInviteCreateForm />
    </FormContainer>
  );
};
