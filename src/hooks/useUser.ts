import { useEffect, useState } from 'react';
import { IUserResponse } from '@api/api/types';
import { app } from '@api/app/client.app';
import { flushSync } from 'react-dom';

export const useUser = () => {
  const [user, setUser] = useState<IUserResponse>(() => app.getState().user);
  useEffect(() => {
    const handler = (data: IUserResponse) => setUser(data);
    app.on('user', handler);
    return () => app.remove('user', handler);
  }, []);

  return user;
};
