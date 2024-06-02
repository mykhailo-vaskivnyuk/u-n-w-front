import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { WaitingList } from '@components/wait/waiting.list/waiting.list';

export const NetWaiting: FC = () => {
  return (
    <FormContainer title="Запити на вхід до спільноти">
      <WaitingList />
    </FormContainer>
  );
};
