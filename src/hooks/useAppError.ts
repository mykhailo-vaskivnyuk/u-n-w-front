import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HttpResponseError } from '@api/errors';
import { app } from '@api/app/client.app';

export const useAppError = () => {
  const [error, setError] = useState<HttpResponseError | null>(() => app.getState().error);
  const location = useLocation();

  useEffect(() => setError(null), [location]);

  useEffect(() => {
    const handler = (e: HttpResponseError | null) => setError(e);
    app.on('error', handler);
    return () => app.remove('error', handler);
  }, []);

  return error;
};
