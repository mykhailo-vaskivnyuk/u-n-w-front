import { useEffect, useState } from 'react';
import { IUserResponse } from '@server/types/types';
import { app } from '@client/app';
import { useNavigateTo } from './useNavigateTo';

export const useUser = () => {
  const [user, setUser] = useState<IUserResponse>(() => app.getState().user);
  const { userStatus } = app.getState();
  const navigate = useNavigateTo();

  useEffect(() => {
    app.on('user', setUser);
    return () => app.remove('user', setUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    const pathname = localStorage.getItem('pathname');
    localStorage.removeItem('pathname');
    pathname && navigate.to(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return [user, userStatus] as const;
};
