import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { useMember } from '@hooks/useMember';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';
import { MemberInviteForm } from '@components/forms/member/invite/invite';
import { MemberCancelInviteForm } from '@components/forms/member/invite/cancel.invite';
import { FormContainer } from '@components/forms/form.container/form.container';

const memberPath = RoutesMap.NET.NET_ID.TREE.NODE_ID.INDEX;

export const TreeMemberInvite: FC = () => {
  const { net } = app.getState();
  const { token, node_id: nodeId, name } = useMember();

  const navigate = useNavigate();
  const navigateToMember = useCallback(
    () => navigate(makeDynamicPathname(memberPath, net!.net_id, nodeId)),
    [navigate, net, nodeId],
  );

  useEffect(() => {
    if (name) navigateToMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

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
