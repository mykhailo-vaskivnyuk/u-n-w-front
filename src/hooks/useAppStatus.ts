import { app } from '@client/app';
import { AppStatus } from '@client/constants';
import { useEffect, useState } from 'react';

export const useAppStatus = () => {
  const [status, setStatus] = useState<AppStatus>(() => app.getState().status);
  useEffect(() => {
    app.on('statuschanged', setStatus);
    return () => app.remove('statuschanged', setStatus);
  }, []);

  return status;
};
