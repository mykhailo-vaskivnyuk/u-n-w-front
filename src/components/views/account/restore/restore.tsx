import { FC, useEffect } from 'react';
import { app } from '@api/app/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/router/constants';

export const Restore: FC = () => {
  const navigate = useNavigate();
  const { params } = useMatch({ path: '/restore/:link' }) || {};

  useEffect(() => {
    const { link } = params || {};
    if (!link) {
      navigate(RoutesMap.INDEX);
      return modalService.showError('Невірний лінк');
    }
    app.account
      .loginOverLink('restore', { link })
      .then((user) => {
        if (user) return navigate(RoutesMap.ACCOUNT.CONFIRM);
        navigate(RoutesMap.INDEX);
        modalService.showError('Невірний лінк');
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
