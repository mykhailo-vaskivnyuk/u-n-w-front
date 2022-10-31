import React, { FC } from 'react';
import { FormContainer } from '@components/views/form.container/form.container';
import { AccountForm } from '@components/forms/account/account';

export const Account: FC = () => {
  return (
    <FormContainer title="Акаунт">
      <AccountForm />
    </FormContainer>
  );
};
