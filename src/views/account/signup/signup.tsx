import React, { FC } from 'react';
import { FormContainer } from '@components/forms/form.container/form.container';
import { SignupForm } from '@components/forms/account/signup/signup';

export const Signup: FC = () => {
  return (
    <FormContainer title="Створити акаунт">
      <SignupForm />
    </FormContainer>
  );
};
