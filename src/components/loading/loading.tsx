import React, { FC } from 'react';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './loading.styles';

export const Loading: FC = () => {
  const { root, icon } = useStyles();

  return (
    <div className={root}>
      <Icon icon={ICONS.spinner} className={icon} />
    </div>
  );
};
