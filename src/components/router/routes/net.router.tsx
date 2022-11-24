import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { Net } from '@components/views/net/net/net';
import { NetCreate } from '@components/views/net/net.create/create';
import { NetComeout } from '@components/views/net/net.comeout/net.comeout';
import { NetLeave } from '@components/views/net/net.leave/net.leave';
import { NetMain } from '@components/views/user/net.main/net.main';

export const NetRouter = (
  <Route path={RelativeRoutesMap.USER.NET.INDEX}>
    <Route path="" element={<Net />} />
    <Route path={RelativeRoutesMap.USER.NET.CREATE} element={<NetCreate />} />
    <Route path={RelativeRoutesMap.USER.NET.COMEOUT} element={<NetComeout />} />
    <Route path={RelativeRoutesMap.USER.NET.LEAVE} element={<NetLeave />} />
    <Route path={RelativeRoutesMap.USER.NET.NET_NUMBER.INDEX}>
      <Route path="" element={<NetMain />} />
      <Route path="create" element={<NetCreate />} />
    </Route>
  </Route>
);
