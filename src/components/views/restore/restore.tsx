import { FC, useEffect } from 'react';
import { app } from '@api/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import modalService from '@services/modal.service';

export const Restore: FC = () => {
  const navigate = useNavigate();
  const { params } = useMatch({ path: '/restore/:link' }) || {};

  useEffect(() => {
    const { link } = params || {};
    if (!link) {
      navigate('/');
      return modalService.showMessage('Невірний лінк');
    }
    app
      .restore({ link })
      .then((success) => {
        if (success) return navigate('/account');
        modalService.showMessage('Невірний лінк', () => navigate('/'));
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
