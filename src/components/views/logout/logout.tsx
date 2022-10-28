import { FC, useEffect } from 'react';
import { app } from '@api/client.app/client.app';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@components/router/constants';

export const Logout: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    app.account.logout().then((success) => {
      success ? navigate(RoutesMap.ACCOUNT.LOGIN) : window.history.back();
    });
  }, [navigate]);
  return null;
};
