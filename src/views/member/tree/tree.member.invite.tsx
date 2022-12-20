import React, { FC } from 'react';
import { useMember } from '@hooks/useMember';
import { MemberInviteForm } from '@components/forms/member/invite/invite';
import { MemberCancelInviteForm } from '@components/forms/member/invite/cancel.invite';
import { FormContainer } from '@components/forms/form.container/form.container';

export const TreeMemberInvite: FC = () => {
  const { token } = useMember();

  return token ? (
    <FormContainer title="Cancel Invite">
      <MemberCancelInviteForm />
    </FormContainer>
  ) : (
    <FormContainer title="Invite Member">
      <MemberInviteForm />
    </FormContainer>
  );
};
