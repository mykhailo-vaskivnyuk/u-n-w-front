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

export const RoutesMap = {
  INDEX: '/',
  ACCOUNT: {
    INDEX: { rel: 'account', full: '/account'},
    SIGNUP: { rel: 'signup', full: '/account/signup' },
    LOGIN: { rel: 'login', full: '/account/login' },
    OVERMAIL: { rel: 'overmail', full: '/account/overmail' },
    LOGOUT: { rel: 'logout', full: '/account/logout' },
    CONFIRM: { rel: 'confirm/*', full: '/account/confirm/*' },
    RESTORE: { rel: 'restore/*', full: '/account/restore/*' },
  },
  PALETTE: 'palette',
};

export const Router: FC = () => {
  return (
    <Routes>
      <Route path={RoutesMap.INDEX}>
        <Route path="" element={<Main />} />
        <Route path={RoutesMap.ACCOUNT.INDEX.rel}>
          <Route path="" element={<AccountForm />} />
          <Route path={RoutesMap.ACCOUNT.SIGNUP.rel} element={<SignupForm />} />
          <Route path={RoutesMap.ACCOUNT.LOGIN.rel} element={<LoginForm />} />
          <Route path={RoutesMap.ACCOUNT.LOGOUT.rel} element={<Logout />} />
          <Route path={RoutesMap.ACCOUNT.OVERMAIL.rel} element={<OvermailForm />} />
          <Route path={RoutesMap.ACCOUNT.CONFIRM.rel} element={<Confirm />} />
          <Route path={RoutesMap.ACCOUNT.RESTORE.rel} element={<Restore />} />
        </Route>
        <Route path="palette" element={<Palette />} />
      </Route>
    </Routes>
  );
};
