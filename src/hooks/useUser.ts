import { useEffect, useState } from 'react';
import { IUserResponse } from '@api/api/types/types';
import { app } from '@api/app/client.app';

export const useUser = () => {
  const [user, setUser] = useState<IUserResponse>(() => app.getState().user);
  useEffect(() => {
    const handler = (data: IUserResponse) => setUser(data);
    app.on('user', handler);
    return () => app.remove('user', handler);
  }, []);

  return user;
};
