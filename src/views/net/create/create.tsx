import React, { FC } from 'react';
import { FormContainer } from '@components/forms/form.container/form.container';
import { NetCreateForm } from '@components/forms/net/create/create';

export const NetCreate: FC = () => {
  return (
    <FormContainer title="Створити спільноту">
      <NetCreateForm />
    </FormContainer>
  );
};
