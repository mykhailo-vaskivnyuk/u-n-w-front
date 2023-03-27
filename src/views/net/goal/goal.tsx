import React, { FC } from 'react';
import { FormContainer } from '@components/forms/form.container/form.container';
import { NetGoalForm } from '@components/forms/net/goal/goal';

export const NetGoal: FC = () => {
  return (
    <FormContainer title="Мета спільноти">
      <NetGoalForm />
    </FormContainer>
  );
};
