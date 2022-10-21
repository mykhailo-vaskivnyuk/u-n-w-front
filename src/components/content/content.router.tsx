import React, { FC } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Main } from '@components/views/main/main';
import { AuthForm } from '@components/forms/auth/auth';
import { SignupForm } from '@components/forms/signup/signup';
import { OvermailForm } from '@components/forms/overmail/overmail';

const router = createHashRouter([
  {
    element: <Main />,
    path: '/',
  },
  {
    element: <AuthForm />,
    path: '/auth',
  },
  {
    element: <SignupForm />,
    path: '/signup',
  },
  {
    element: <OvermailForm />,
    path: '/overmail',
  },
]);

export const Router: FC = () => <RouterProvider router={router} />;
