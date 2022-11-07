import React, { FC, useEffect, useState } from 'react';
import { Icon, ICONS } from '@components/icon/icon';
import { AppState } from '@api/constants';
import { useAppState } from '@hooks/useAppState';
import { useStyles } from './loading.styles';

export const Loading: FC = () => {
  const { root, icon } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const state = useAppState();

  useEffect(() => {
    const isLoading = state === AppState.LOADING || state === AppState.INIT;
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isLoading) {
      if (loading) return;
      timer = setTimeout(() => setLoading(true), 500);
    } else if (loading) {
      timer = setTimeout(() => setLoading(false), 500);
    }
    return () => {
      timer && clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!loading) return null;

  return (
    <div className={root}>
      <Icon icon={ICONS.spinner} className={icon} />
    </div>
  );
};
