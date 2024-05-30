import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { WaitList } from '@components/wait/wait.list/wait.list';

export const WaitNets: FC = () => {
  return (
    <FormContainer title="Запити на вхід до спільнот">
      <WaitList />
    </FormContainer>
  );
};
