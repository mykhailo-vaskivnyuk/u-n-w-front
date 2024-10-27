import React, { FC } from 'react';
import { useStyles } from './table.styles';

interface TableProps {
  items: { title: string; value: string | number }[];
}
export const Table: FC<TableProps> = ({ items }) => {
  const { root, row } = useStyles();

  const itemsJsx = items.map(({ title, value }, i) => (
    <div key={i} className={row}>
      <div>{title}</div>
      <div>{value}</div>
    </div>
  ));
  return <div className={root}>{itemsJsx}</div>;
};
