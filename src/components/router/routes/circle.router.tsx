import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { MemberCircle } from '@components/member/member.circle';
import { NetUser } from '@components/member/net.user';

export const CircleRouter = (
  <Route path={RelativeRoutesMap.NET.NET_NUMBER.CIRCLE.INDEX}>
    <Route path={RelativeRoutesMap.NET.NET_NUMBER.CIRCLE.USER} element={<NetUser />} />
    <Route path={RelativeRoutesMap.NET.NET_NUMBER.CIRCLE.MEMBER} element={<MemberCircle />} />
  </Route>
);
