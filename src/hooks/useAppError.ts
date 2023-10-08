import { useEffect, useState } from 'react';
import { app } from '@client/app';

export const useAppError = () => {
  const [error, setError] = useState<Error | null>(() => app.getState().error);

  useEffect(() => {
    const handler = () => {
      if (app.getState().error) return;
      setError(null);
    };
    app.on('statuschanged', handler);
    app.on('error', setError);
    return () => {
      app.remove('statuschanged', handler);
      app.remove('error', setError);
    }
  }, []);

  return error;
};
