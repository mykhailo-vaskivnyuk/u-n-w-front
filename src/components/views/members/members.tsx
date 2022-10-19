import React, { FC } from 'react';
import { useStyles } from './members.styles';

export const Members: FC = () => {
  const { root, menu, member } = useStyles();
  const members = new Array(7).fill(0).map((i, j) => (
    <div key={`${i + j}`} className={member}>
      member {i}
    </div>
  ));
  return (
    <div className={root}>
      <div className={menu}>member menu</div>
      {members}
    </div>
  );
};
