import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { NetUser } from '@views/member/user/net.user';
import { TreeMemberIndex } from '@views/member/tree/tree.member.index';
import { TreeMember } from '@views/member/tree/tree.member';
import { TreeMemberInvite } from '@views/member/tree/tree.member.invite';

const { TREE } = RelativeRoutesMap.NET.NET_ID;

export const TreeRouter = (
  <Route path={TREE.INDEX}>
    <Route path={TREE.USER} element={<NetUser />} />
    <Route path={TREE.NODE_ID.INDEX} element={<TreeMemberIndex />}>
      <Route path="" element={<TreeMember />} />
      <Route path={TREE.NODE_ID.INVITE} element={<TreeMemberInvite />} />
    </Route>
  </Route>
);
