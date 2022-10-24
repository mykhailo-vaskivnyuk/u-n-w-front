import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '@components/views/main/main';
import { AuthForm } from '@components/forms/auth/auth';
import { OvermailForm } from '@components/forms/overmail/overmail';
import { SignupForm } from '@components/forms/signup/signup';
import { Logout } from '@components/logout/logout';
import { useStyles } from './content.styles';

export const Content: FC = () => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <Routes>
        <Route path="/">
          <Route path="" element={<Main />} />
          <Route path="logout" element={<Logout />} />
          <Route path="auth" element={<AuthForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="overmail" element={<OvermailForm />} />
        </Route>
      </Routes>
    </div>
  );
};
