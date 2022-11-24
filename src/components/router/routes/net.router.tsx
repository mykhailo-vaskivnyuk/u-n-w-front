import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { Net } from '@components/views/net/net/net';
import { NetCreate } from '@components/views/net/create/create';
import { NetComeout } from '@components/views/net/comeout/comeout';
import { NetLeave } from '@components/views/net/leave/leave';
import { NetMain } from '@components/views/net/number/net.number';

export const NetRouter = (
  <Route path={RelativeRoutesMap.NET.INDEX}>
    <Route path="" element={<Net />} />
    <Route path={RelativeRoutesMap.NET.CREATE} element={<NetCreate />} />
    <Route path={RelativeRoutesMap.NET.COMEOUT} element={<NetComeout />} />
    <Route path={RelativeRoutesMap.NET.LEAVE} element={<NetLeave />} />
    <Route path={RelativeRoutesMap.NET.NET_NUMBER.INDEX}>
      <Route path="" element={<NetMain />} />
      <Route path="create" element={<NetCreate />} />
    </Route>
  </Route>
);
