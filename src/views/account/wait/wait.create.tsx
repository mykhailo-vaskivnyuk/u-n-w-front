import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { WaitCreateForm } from '@components/forms/account/wait/create';

export const WaitCreate: FC = () => {
  return (
    <FormContainer title="Запит на вхід до спільноти">
      <WaitCreateForm />
    </FormContainer>
  );
};
