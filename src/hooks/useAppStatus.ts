import { app } from '@api/app/client.app';
import { AppStatus } from '@api/constants';
import { useEffect, useState } from 'react';

export const useAppStatus = () => {
  const [status, setStatus] = useState<AppStatus>(() => app.getState().status);
  useEffect(() => {
    app.on('statuschanged', setStatus);
    return () => app.remove('statuschanged', setStatus);
  }, []);

  return status;
};
