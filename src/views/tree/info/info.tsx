import React, { FC } from 'react';
import { FormContainer } from '@components/containers/form.container';
import { app } from '@client/app';
import { Table } from '@components/table/table';

export const TreeInfo: FC = () => {
  const { userNetData, tree } = app.getState();

  const count = {
    title: 'Кількість учасників всього',
    value: userNetData!.count_of_members,
  };

  const userCount = {
    title: 'Я',
    value: userNetData!.count_of_members - 1,
  };

  const data = tree
    .filter(({ memberStatus }) => memberStatus === 'ACTIVE')
    .map(({ member_name: title, count_of_members: v }) => ({ title, value: v - 1 }));

  const items = [count, userCount, ...data];

  return (
    <FormContainer title="Інформація про дерево">
      <Table items={items} />
    </FormContainer>
  );
};
