import { FC, useEffect } from 'react';
import { app } from '@api/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import modalService from '@services/modal.service';

export const Confirm: FC = () => {
  const navigate = useNavigate();
  const { params } = useMatch({ path: '/confirm/:link' }) || {};

  useEffect(() => {
    const { link } = params || {};
    if (!link) {
      navigate('/');
      return modalService.showMessage('Невірний лінк');
    }
    app
      .confirm({ link })
      .then((success) => {
        if (success) return navigate('/account');
        navigate('/');
        modalService.showMessage('Невірний лінк');
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
