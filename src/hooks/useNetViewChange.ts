import { useEffect, useState } from 'react';
import { app } from '@client/app';
import { NetViewEnum } from '@app/common/server/types/net.types';

export const useNetViewChange = () => {
  const [netView, setNetView] = useState<NetViewEnum>(() => app.getState().netView!);

  useEffect(() => {
    app.on('netView', setNetView);
    return () => app.remove('net', setNetView);
  }, []);

  return netView;
};
