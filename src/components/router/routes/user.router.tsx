import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { NetMain } from '@components/views/user/net.main/net.main';
import { NetCreate } from '@components/views/net/create/create';

export const UserRouter = (
  <Route path={RelativeRoutesMap.USER.INDEX}>
    {/* <Route path="" element={<User />} /> */}
    <Route path={RelativeRoutesMap.USER.NET.CREATE} element={<NetCreate />} />
    <Route path={RelativeRoutesMap.USER.NET.NET_NUMBER.INDEX}>
      <Route path={RelativeRoutesMap.USER.NET.NET_NUMBER.INDEX} element={<NetMain />} />
      <Route path={RelativeRoutesMap.USER.NET.NET_NUMBER.CREATE} element={<NetCreate />} />
    </Route>
  </Route>
);
