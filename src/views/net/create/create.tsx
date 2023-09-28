import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { NetCreateForm } from '@components/forms/net/create/create';

export const NetCreate: FC = () => {
  return (
    <FormContainer title="Створити спільноту">
      <NetCreateForm />
    </FormContainer>
  );
};
