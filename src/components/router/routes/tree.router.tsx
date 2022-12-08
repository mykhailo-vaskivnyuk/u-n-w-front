import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { MemberTree } from '@components/member/member.tree';
import { NetUser } from '@components/member/net.user';

export const TreeRouter = (
  <Route path={RelativeRoutesMap.NET.NET_NUMBER.TREE.INDEX}>
    <Route path={RelativeRoutesMap.NET.NET_NUMBER.CIRCLE.USER} element={<NetUser />} />
    <Route path={RelativeRoutesMap.NET.NET_NUMBER.TREE.MEMBER} element={<MemberTree />} />
  </Route>
);
