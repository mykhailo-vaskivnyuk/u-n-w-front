import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { CircleMember } from '@components/member/circle/circle.member';
import { NetUser } from '@components/member/user/net.user';

const { CIRCLE } = RelativeRoutesMap.NET.NET_ID;

export const CircleRouter = (
  <Route path={CIRCLE.INDEX}>
    <Route path={CIRCLE.USER} element={<NetUser />} />
    <Route path={CIRCLE.NODE_ID.INDEX} element={<CircleMember />} />
  </Route>
);
