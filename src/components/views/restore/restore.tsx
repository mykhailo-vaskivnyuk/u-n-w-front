import { FC, useEffect } from 'react';
import { app } from '@api/client.app/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/app/router';

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
      .restore({ link })
      .then((success) => {
        if (success) return navigate(RoutesMap.ACCOUNT.CONFIRM.full);
        navigate(RoutesMap.INDEX);
        modalService.showError('Невірний лінк');
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
