import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HttpResponseError } from '@client/connection/errors';
import { app } from '@client/app';

export const useAppError = () => {
  const [error, setError] = useState<HttpResponseError | null>(() => app.getState().error);
  const location = useLocation();

  useEffect(() => setError(null), [location]);

  useEffect(() => {
    app.on('error', setError);
    return () => app.remove('error', setError);
  }, []);

  return error;
};
