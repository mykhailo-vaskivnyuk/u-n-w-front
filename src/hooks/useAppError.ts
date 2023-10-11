import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { app } from '@client/app';

export const useAppError = () => {
  const [error, setError] = useState<Error | null>(() => app.getState().error);
  const location = useLocation();

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
    };
  }, []);

  useEffect(() => setError(null), [location]);

  return error;
};
