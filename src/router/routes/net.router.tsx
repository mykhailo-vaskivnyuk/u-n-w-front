import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { Net } from '@components/views/net/net';
import { NetCreate } from '@components/views/net/create/create';
import { NetComeout } from '@components/views/net/comeout/comeout';
import { NetLeave } from '@components/views/net/leave/leave';
import { NetInvite } from '@components/views/net/invite/invite';
import { NetIdIndex } from '@components/views/net/net.id/net.id.index';
import { NetId } from '@components/views/net/net.id/net.id';
import { CircleRouter } from './circle.router';
import { TreeRouter } from './tree.router';

export const NetRouter = (
  <Route path={RelativeRoutesMap.NET.INDEX}>
    <Route path="" element={<Net />} />
    <Route path={RelativeRoutesMap.NET.CREATE} element={<NetCreate />} />
    <Route path={RelativeRoutesMap.NET.COMEOUT} element={<NetComeout />} />
    <Route path={RelativeRoutesMap.NET.LEAVE} element={<NetLeave />} />
    <Route path={RelativeRoutesMap.NET.INVITE} element={<NetInvite />} />
    <Route path={RelativeRoutesMap.NET.NET_ID.INDEX} element={<NetIdIndex />}>
      <Route path="" element={<NetId />} />
      <Route path="create" element={<NetCreate />} />
      {CircleRouter}
      {TreeRouter}
    </Route>
  </Route>
);
