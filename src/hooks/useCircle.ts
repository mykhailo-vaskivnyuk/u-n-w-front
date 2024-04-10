import { useEffect, useState } from 'react';
import { IMember } from '@client/types';
import { app } from '@client/app';

export const useCircle = () => {
  const [circle, setCircle] = useState<IMember[]>(() => app.getState().circle);

  useEffect(() => {
    app.on('circle', setCircle);
    return () => app.remove('circle', setCircle);
  }, []);

  return circle;
};
