import { FC, useEffect } from 'react';
import { app } from '@api/client.app';
import { useMatch, useNavigate } from 'react-router-dom';

export const Confirm: FC = () => {
  const navigate = useNavigate();
  const { params } = useMatch({ path: '/confirm/:link' }) || {};
  useEffect(() => {
    app
      .confirm({ link: params?.link || '' })
      .then(() => navigate('/'))
      .catch((e) => console.log(e));
  }, [navigate, params?.link]);
  return null;
};
