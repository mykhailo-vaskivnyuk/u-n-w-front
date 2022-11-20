import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { NetMain } from '@components/views/user/net.main/net.main';

export const UserRouter = (
  <Route path={RelativeRoutesMap.USER.INDEX}>
    {/* <Route path="" element={<User />} /> */}
    <Route path={RelativeRoutesMap.USER.NET} element={<NetMain />} />
  </Route>
);
