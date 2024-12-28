import React, { FC, useEffect, useState } from 'react';
import { Icon } from '@components/icon/icon';
import { AppStatus } from '@client/constants';
import { useAppStatus } from '@hooks/useAppStatus';
import { useStyles } from './loading.styles';

export const Loading: FC = () => {
  const { root, icon } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const status = useAppStatus();

  useEffect(() => {
    const isLoading = status === AppStatus.LOADING || status === AppStatus.INITING;
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
  }, [status]);

  if (!loading) return null;

  return (
    <div className={root}>
      <Icon icon="spinner" className={icon} />
    </div>
  );
};
