import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { app } from '@client/app';
import { Table } from '@components/table/table';

export const NetInfo: FC = () => {
  const { net } = app.getState();

  const items = [
    {
      title: 'Кількість учасників',
      value: net?.total_count_of_members || 0,
    },
  ];

  return (
    <FormContainer title="Інформація про спільноту">
      <Table items={items} />
    </FormContainer>
  );
};
