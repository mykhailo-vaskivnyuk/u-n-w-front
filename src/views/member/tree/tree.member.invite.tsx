import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';
import { MemberInviteCreateForm } from '@components/forms/member/invite/invite.create';
import { MemberInviteCancelForm } from '@components/forms/member/invite/invite.cancel';
import { FormContainer } from '@components/forms/form.container/form.container';

const memberPath = RoutesMap.NET.NET_ID.TREE.NODE_ID.INDEX;

export const TreeMemberInvite: FC = () => {
  const { net } = app.getState();
  const { node_id: nodeId, memberStatus } = app.getState().memberData!;

  const navigate = useNavigate();
  const navigateToMember = useCallback(
    () => navigate(makeDynamicPathname(memberPath, net!.net_id, nodeId)),
    [navigate, net, nodeId],
  );

  useEffect(() => {
    if (memberStatus === 'ACTIVE' || memberStatus === 'CONNECTED') {
      navigateToMember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

  return memberStatus === 'INVITING' ? (
    <FormContainer title="Cancel Invite">
      <MemberInviteCancelForm />
    </FormContainer>
  ) : (
    <FormContainer title="Invite Member">
      <MemberInviteCreateForm />
    </FormContainer>
  );
};
