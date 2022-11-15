import React, { FC } from 'react';
import { FormContainer } from '@components/views/form.container/form.container';
import { OvermailForm } from '@components/forms/account/overmail/overmail';

export const Overmail: FC = () => {
  return (
    <FormContainer title="Увійти через EMAIL">
      <OvermailForm />
    </FormContainer>
  );
};
