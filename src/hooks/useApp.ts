import { app } from '@client/app';
import { useEffect } from 'react';

export const useApp = () => {
  useEffect(() => {
    app.init();
  }, []);
};
