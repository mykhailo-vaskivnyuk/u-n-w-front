import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { NetInviteForm } from '@components/forms/net/invite/invite';

export const NetInvite: FC = () => {
  return (
    <FormContainer title="Запрошення до спільноти">
      <NetInviteForm />
    </FormContainer>
  );
};
