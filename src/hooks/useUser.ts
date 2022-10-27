import { useEffect, useState } from 'react';
import { IUser } from '@api/types';
import { app } from '@api/client.app/client.app';

export const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const handler = (data: IUser | null) => setUser(data);
    app.on('user', handler);
    return app.remove('user', handler);
  }, []);

  return user;
};
