import React, { FC } from 'react';
import { useNet } from '@hooks/useNet';
import { FormContainer } from '@components/views/form.container/form.container';
import { NetCreateForm } from '@components/forms/net/create/create';

export const NetCreate: FC = () => {
  const [net] = useNet();
  if (net) return <div>not implemented</div>;

  return (
    <FormContainer title="Створити спільноту">
      <NetCreateForm />
    </FormContainer>
  );
};
