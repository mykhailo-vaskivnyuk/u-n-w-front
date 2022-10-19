import React, { FC } from 'react';
import { useStyles } from './footer.styles';

export const Footer: FC = () => {
  const { root } = useStyles();
  return <div className={root}>footer</div>;
};
