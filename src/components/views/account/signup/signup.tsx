import React, { FC } from 'react';
import { FormContainer } from '@components/views/form.container/form.container';
import { SignupForm } from '@components/forms/signup/signup';

export const Signup: FC = () => {
  return (
    <FormContainer title="Створити акаунт">
      <SignupForm />
    </FormContainer>
  );
};
