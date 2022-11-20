import { getAppStateFromHash } from '@utils/utils';
import { app } from '@api/app/client.app';
import { useEffect } from 'react';

export const useApp = () => {
  useEffect(() => {
    const initialState = getAppStateFromHash();
    app.init(initialState);
  }, []);
};
