import { app } from '@api/app/client.app';
import { useEffect } from 'react';

export const useApp = () => {
  useEffect(() => {
    app.init();
  }, []);
};
