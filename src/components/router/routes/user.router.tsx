import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { User } from '@components/views/user/user/user';
import { NetRouter } from './net.router';

export const UserRouter = (
  <Route path={RelativeRoutesMap.USER.INDEX}>
    <Route path="" element={<User />} />
    {NetRouter}
  </Route>
);
