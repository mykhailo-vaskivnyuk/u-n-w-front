import { useEffect, useState } from 'react';
import { IMember } from '@project-types/member.types';
import { app } from '@api/app/client.app';

export const useCircle = () => {
  const [circle, setCircle] = useState<IMember[]>(() => app.getState().circle);

  useEffect(() => {
    app.on('circle', setCircle);
    return () => app.remove('circle', setCircle);
  }, []);

  return circle;
};
