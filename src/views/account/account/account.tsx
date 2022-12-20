import React, { FC } from 'react';
import { FormContainer } from '@components/forms/form.container/form.container';
import { AccountForm } from '@components/forms/account/account/account';

export const Account: FC = () => {
  return (
    <FormContainer title="Акаунт">
      <AccountForm />
    </FormContainer>
  );
};
