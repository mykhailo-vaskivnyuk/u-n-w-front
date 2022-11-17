import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { Account } from '@components/views/account/account/account';
import { Signup } from '@components/views/account/signup/signup';
import { Login } from '@components/views/account/login/login';
import { Logout } from '@components/views/account/logout/logout';
import { Overmail } from '@components/views/account/overmail/overmail';
import { Confirm } from '@components/views/account/confirm/confirm';
import { Restore } from '@components/views/account/restore/restore';

export const AccountRouter: FC = () => {
  return (
    <Route path={RelativeRoutesMap.ACCOUNT.INDEX}>
      <Route path="" element={<Account />} />
      <Route path={RelativeRoutesMap.ACCOUNT.SIGNUP} element={<Signup />} />
      <Route path={RelativeRoutesMap.ACCOUNT.LOGIN} element={<Login />} />
      <Route path={RelativeRoutesMap.ACCOUNT.LOGOUT} element={<Logout />} />
      <Route path={RelativeRoutesMap.ACCOUNT.OVERMAIL} element={<Overmail />} />
      <Route path={RelativeRoutesMap.ACCOUNT.CONFIRM} element={<Confirm />} />
      <Route path={RelativeRoutesMap.ACCOUNT.RESTORE} element={<Restore />} />
    </Route>
  );
};
