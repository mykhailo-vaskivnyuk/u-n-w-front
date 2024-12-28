import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { NetGoalForm } from '@components/forms/net/goal/goal';

export const NetGoal: FC = () => {
  return (
    <FormContainer title="Мета спільноти">
      <NetGoalForm />
    </FormContainer>
  );
};
