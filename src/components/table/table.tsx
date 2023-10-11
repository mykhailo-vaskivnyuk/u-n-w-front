import React, { FC } from 'react';
import { useStyles } from './table.styles';

interface TableProps {
  items: { title: string; value: string | number }[];
}
export const Table: FC<TableProps> = ({ items }) => {
  const { root } = useStyles();

  const itemsJsx = items.map(({ title, value }) => (
    <>
      <div>{title}</div>
      <div>{value}</div>
    </>
  ));
  return <div className={root}>{itemsJsx}</div>;
};
