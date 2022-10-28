import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Palette } from '@components/palette/palette';
import { Main } from '@components/views/main/main';
import { AuthForm } from '@components/forms/auth/auth';
import { OvermailForm } from '@components/forms/overmail/overmail';
import { SignupForm } from '@components/forms/signup/signup';
import { Logout } from '@components/views/logout/logout';
import { Confirm } from '@components/views/confirm/confirm';
import { AccountForm } from '@components/forms/account/account';
import { Restore } from '@components/views/restore/restore';

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="palette" element={<Palette />} />
        <Route path="" element={<Main />} />
        <Route path="account" element={<AccountForm />} />
        <Route path="logout" element={<Logout />} />
        <Route path="auth" element={<AuthForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="overmail" element={<OvermailForm />} />
        <Route path="confirm/*" element={<Confirm />} />
        <Route path="restore/*" element={<Restore />} />
      </Route>
    </Routes>
  );
};
