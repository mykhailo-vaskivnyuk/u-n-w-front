import React, { FC, useEffect, useState } from 'react';
import { Icon, ICONS } from '@components/icon/icon';
import { AppState } from '@api/constants';
import { useStyles } from './loading.styles';

export const Loading: FC<{ state: AppState }> = ({ state }) => {
  const { root, icon } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const isLoading = state === AppState.LOADING || state === AppState.INIT;
    if (isLoading) return setLoading(isLoading);
    const timer = setTimeout(() => setLoading(isLoading), 1000);
    return () => clearTimeout(timer);
  }, [state]);

  if (!loading) return null;

  return (
    <div className={root}>
      <Icon icon={ICONS.spinner} className={icon} />
    </div>
  );
};
