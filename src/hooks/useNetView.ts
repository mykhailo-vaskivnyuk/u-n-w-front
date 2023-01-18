import { useEffect, useState } from 'react';
import { NetViewKeys } from '@api/api/types/types';
import { app } from '@api/app/client.app';

export const useNetView = (netView: NetViewKeys) => {
  const { netView: curNetView } = app.getState();
  const [loading, setLoading] = useState<boolean>(false);

  const loaded = curNetView !== netView;

  useEffect(() => {
    if (loading) return;
    setLoading(curNetView !== netView);
    app.netMethods.setView(netView);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netView, curNetView, loading]);

  return !loading && loaded && curNetView;
};
