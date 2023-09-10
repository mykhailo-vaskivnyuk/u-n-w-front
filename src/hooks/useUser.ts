import { useEffect, useState } from 'react';
import { IUserResponse } from '@server/types/types';
import { app } from '@client/app';

export const useUser = () => {
  const [user, setUser] = useState<IUserResponse>(() => app.getState().user);
  const { userStatus } = app.getState();

  useEffect(() => {
    app.on('user', setUser);
    return () => app.remove('user', setUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    const location = localStorage.getItem('location');
    localStorage.removeItem('location');
    if (location) window.location.href = location;
  }, [user]);

  return [user, userStatus] as const;
};
