import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { Account } from '@views/account/account/account';
import { Signup } from '@views/account/signup/signup';
import { Login } from '@views/account/login/login';
import { Logout } from '@views/account/logout/logout';
import { Overmail } from '@views/account/overmail/overmail';
import { Confirm } from '@views/account/confirm/confirm';
import { Restore } from '@views/account/restore/restore';
import { Messenger } from '@views/account/messenger/messenger';
import { WaitForNets } from '@views/account/wait/wait';

export const AccountRouter = (
  <Route path={RelativeRoutesMap.ACCOUNT.INDEX}>
    <Route path="" element={<Account />} />
    <Route path={RelativeRoutesMap.ACCOUNT.SIGNUP} element={<Signup />} />
    <Route path={RelativeRoutesMap.ACCOUNT.LOGIN} element={<Login />} />
    <Route path={RelativeRoutesMap.ACCOUNT.LOGOUT} element={<Logout />} />
    <Route path={RelativeRoutesMap.ACCOUNT.OVERMAIL} element={<Overmail />} />
    <Route path={RelativeRoutesMap.ACCOUNT.CONFIRM} element={<Confirm />} />
    <Route path={RelativeRoutesMap.ACCOUNT.RESTORE} element={<Restore />} />
    <Route path={RelativeRoutesMap.ACCOUNT.MESSENGER} element={<Messenger />} />
    <Route path={RelativeRoutesMap.ACCOUNT.WAIT} element={<WaitForNets />} />
  </Route>
);
