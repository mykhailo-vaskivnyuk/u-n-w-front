import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { app } from '@client/app';
import { Table } from '@components/table/table';

export const TreeInfo: FC = () => {
  const { userNetData } = app.getState();

  const items = [
    {
      title: 'Кількість учасників',
      value: userNetData?.count_of_members || 0,
    },
  ];

  return (
    <FormContainer title="Інформація про дерево">
      <Table items={items} />
    </FormContainer>
  );
};
