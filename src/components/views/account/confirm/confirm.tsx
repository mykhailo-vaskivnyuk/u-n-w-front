import { FC, useEffect } from 'react';
import { app } from '@api/client.app/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import { modalService } from '@services/modal.service';

export const Confirm: FC = () => {
  const navigate = useNavigate();
  const { params } = useMatch({ path: '/confirm/:link' }) || {};

  useEffect(() => {
    const { link } = params || {};
    if (!link) {
      navigate('/');
      return modalService.showError('Невірний лінк');
    }
    app.account
      .confirm({ link })
      .then((success) => {
        if (success) return navigate('/account');
        navigate('/');
        modalService.showError('Невірний лінк');
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};