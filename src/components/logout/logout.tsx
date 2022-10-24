import { FC, useEffect } from 'react';
import { app } from '@api/client.app';
import { useNavigate } from 'react-router-dom';

export const Logout: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    app
      .logout({})
      .then(() => navigate('/auth'))
      .catch((e) => console.log(e));
  }, [navigate]);
  return null;
};
