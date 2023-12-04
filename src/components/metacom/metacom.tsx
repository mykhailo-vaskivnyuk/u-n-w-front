import React, { FC } from 'react';
import { useMetacom } from '@hooks/useMetacom';
import { useStyles } from './metacom.styles';

export const Metacom: FC = () => {
  const { root } = useStyles();
  useMetacom();

  return <div className={root}>TEST</div>;
};
