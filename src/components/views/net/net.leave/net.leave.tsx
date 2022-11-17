import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { app } from '@api/app/client.app';

export const NetLeave: FC = () => {
  const navigate = useNavigate();

  const navigateToIndex = () => navigate(RoutesMap.INDEX, { replace: true });

  useEffect(() => {
    app.netMethods.comeout().finally(navigateToIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
