import React, { FC } from 'react';
import { FormContainer } from '@components/forms/form.container/form.container';
import { MessengerForm } from '@components/forms/account/messenger/messenger';

export const Messenger: FC = () => {
  return (
    <FormContainer title="Підключити мессенджер">
      <MessengerForm />
    </FormContainer>
  );
};
