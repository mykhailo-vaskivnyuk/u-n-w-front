import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Palette } from '@components/palette/palette';
import { Main } from '@components/views/main/main';
import { LoginForm } from '@components/forms/login/login';
import { OvermailForm } from '@components/forms/overmail/overmail';
import { SignupForm } from '@components/forms/signup/signup';
import { Logout } from '@components/views/logout/logout';
import { Confirm } from '@components/views/confirm/confirm';
import { AccountForm } from '@components/forms/account/account';
import { Restore } from '@components/views/restore/restore';
import { Redirect } from '@components/router/redirect';
import { RelativeRoutesMap, RoutesMap } from './constants';
import { NotFoundRedirect } from './not.found.redirect';

export const Router: FC = () => {
  return (
    <>
      <Redirect />
      <Routes>
        <Route path={RoutesMap.INDEX} element={<Main />} />
        <Route path={RoutesMap.ACCOUNT.INDEX}>
          <Route path="" element={<AccountForm />} />
          <Route path={RelativeRoutesMap.ACCOUNT.SIGNUP} element={<SignupForm />} />
          <Route path={RelativeRoutesMap.ACCOUNT.LOGIN} element={<LoginForm />} />
          <Route path={RelativeRoutesMap.ACCOUNT.LOGOUT} element={<Logout />} />
          <Route path={RelativeRoutesMap.ACCOUNT.OVERMAIL} element={<OvermailForm />} />
          <Route path={RelativeRoutesMap.ACCOUNT.CONFIRM} element={<Confirm />} />
          <Route path={RelativeRoutesMap.ACCOUNT.RESTORE} element={<Restore />} />
        </Route>
        <Route path={RoutesMap.PALETTE} element={<Palette />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </>
  );
};
