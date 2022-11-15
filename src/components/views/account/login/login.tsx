import React, { FC } from 'react';
import { FormContainer } from '@components/views/form.container/form.container';
import { LoginForm } from '@components/forms/account/login/login';

export const Login: FC = () => {
  return (
    <FormContainer title="Авторизація">
      <LoginForm />
    </FormContainer>
  );
};
