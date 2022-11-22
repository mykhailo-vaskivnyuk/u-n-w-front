import React from 'react';
import { Route } from 'react-router-dom';
import { Net } from '@components/views/net/net/net';
import { RelativeRoutesMap } from '@constants/router.constants';
// import { NetCreate } from '@components/views/net/create/create';
// import { NetEnter } from '@components/views/net/net.enter/net.enter';
import { NetComeout } from '@components/views/net/net.comeout/net.comeout';
import { NetLeave } from '@components/views/net/net.leave/net.leave';

export const NetRouter = (
  <Route path={RelativeRoutesMap.NET.INDEX}>
    <Route path="" element={<Net />} />
    {/* <Route path={RelativeRoutesMap.NET.CREATE} element={<NetCreate />} /> */}
    {/* <Route path={RelativeRoutesMap.NET.ENTER} element={<NetEnter />} /> */}
    <Route path={RelativeRoutesMap.NET.COMEOUT} element={<NetComeout />} />
    <Route path={RelativeRoutesMap.NET.LEAVE} element={<NetLeave />} />
  </Route>
);
