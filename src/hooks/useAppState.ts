import { app } from '@api/client.app/client.app';
import { AppState } from '@api/constants';
import { useEffect, useState } from 'react';

export const useAppState = () => {
  const [state, setState] = useState<AppState>(AppState.INIT);
  useEffect(() => {
    const handler = (data: AppState) => setState(data);
    app.on('statechanged', handler);
    return () => app.remove('statechanged', handler);
  }, []);

  return state;
};
