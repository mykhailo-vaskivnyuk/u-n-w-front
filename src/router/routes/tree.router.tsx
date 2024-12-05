import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { NetViewIndex } from '@views/net.view/net.view.index';
import { NetWaiting } from '@views/tree/waiting/waiting';
import { TreeInfo } from '@views/tree/info/info';
import { NetUser } from '@views/member/user/net.user';
import { TreeChat } from '@views/chat/tree.chat';
import { TreeMemberIndex } from '@views/member/tree/tree.member.index';
import { TreeMember } from '@views/member/tree/tree.member';
import { TreeMemberInvite } from '@views/member/tree/tree.member.invite';
import { TreeMemberConnected } from '@views/member/tree/tree.member.connected';

const { TREE } = RelativeRoutesMap.NET.NET_ID;

export const TreeRouter = (
  <Route path={TREE.INDEX} element={<NetViewIndex netView="tree" />}>
    <Route path="" element={<div>TREE ROOT</div>} />
    <Route path={TREE.WAITING} element={<NetWaiting />} />
    <Route path={TREE.INFO} element={<TreeInfo />} />
    <Route path={TREE.USER} element={<NetUser />} />
    <Route path={TREE.CHAT} element={<TreeChat />} />
    <Route path={TREE.NODE_ID.INDEX} element={<TreeMemberIndex />}>
      <Route path="" element={<TreeMember />} />
      <Route path={TREE.NODE_ID.INVITE} element={<TreeMemberInvite />} />
      <Route path={TREE.NODE_ID.CONNECTED} element={<TreeMemberConnected />} />
    </Route>
  </Route>
);
