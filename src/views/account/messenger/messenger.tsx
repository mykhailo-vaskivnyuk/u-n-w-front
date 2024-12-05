import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { MessengerForm } from '@components/forms/account/messenger/messenger';

export const Messenger: FC = () => {
  return (
    <FormContainer title="Підключити мессенджер">
      <MessengerForm />
    </FormContainer>
  );
};
