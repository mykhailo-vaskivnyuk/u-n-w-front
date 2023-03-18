import { useEffect, useState } from 'react';
import { app } from '@client/app';

export const useAppError = () => {
  const [error, setError] = useState<Error | null>(() => app.getState().error);

  useEffect(() => {
    app.on('error', setError);
    return () => app.remove('error', setError);
  }, []);

  return error;
};
