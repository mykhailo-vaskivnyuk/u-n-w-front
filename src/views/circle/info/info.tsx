import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { app } from '@client/app';
import { Table } from '@components/table/table';

export const CircleInfo: FC = () => {
  const { circle } = app.getState();

  const data = circle
    .filter(({ memberStatus }) => memberStatus === 'ACTIVE')
    .map(({ member_name: title, count_of_members: value }) => ({ title, value }));

  const items = [
    {
      title: 'Кількість учасників',
      value: circle[0].count_of_members || 0,
    },
    ...data,
  ];

  return (
    <FormContainer title="Інформація про коло">
      <Table items={items} />
    </FormContainer>
  );
};
