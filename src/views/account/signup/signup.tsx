import React, { FC } from 'react';
import { app } from '@client/app';
import { FormContainer } from '@components/containers/form.container';
import { SignupForm } from '@components/forms/account/signup/signup';
import { SignupTgForm } from '@components/forms/account/signup/signup.tg';

export const Signup: FC = () => {
  const { tg } = app.getState();
  const SignupComponent = tg ? SignupTgForm : SignupForm;
  return (
    <FormContainer title="Створити акаунт">
      <SignupComponent />
    </FormContainer>
  );
};
