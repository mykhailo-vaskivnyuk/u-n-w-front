import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { NetUser } from '@views/member/user/net.user';
import { Chat } from '@views/chat/chat';
import { CircleMemberIndex } from '@views/member/circle/circle.member.index';
import { CircleMember } from '@views/member/circle/circle.member';

const { CIRCLE } = RelativeRoutesMap.NET.NET_ID;

export const CircleRouter = (
  <Route path={CIRCLE.INDEX}>
    <Route path={CIRCLE.USER} element={<NetUser />} />
    <Route path={CIRCLE.CHAT} element={<Chat />} />
    <Route path={CIRCLE.NODE_ID.INDEX} element={<CircleMemberIndex />}>
      <Route path="" element={<CircleMember />} />
    </Route>
  </Route>
);
