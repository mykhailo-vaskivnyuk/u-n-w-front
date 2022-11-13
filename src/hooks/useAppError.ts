import { useEffect, useState } from 'react';
import { HttpResponseError } from '@api/errors';
import { app } from '@api/app/client.app';

export const useAppError = () => {
  const [error, setError] = useState<HttpResponseError | null>(() => app.getState().error);
  useEffect(() => {
    const handler = (e: HttpResponseError | null) => setError(e);
    app.on('error', handler);
    return () => app.remove('error', handler);
  }, []);

  return error;
};
