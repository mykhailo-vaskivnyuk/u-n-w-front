import { app } from '@api/client.app/client.app';
import { useEffect } from 'react';

export const useApp = () => {
  useEffect(() => {
    app.init();
  }, []);
};
