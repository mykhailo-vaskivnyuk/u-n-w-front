import { FC, useEffect } from 'react';
import { app } from '@api/client.app/client.app';
import { useMatch, useNavigate } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/router/constants';
import { MessagesMap } from '@constants/messages';

export const Confirm: FC = () => {
  const navigate = useNavigate();
  const { params } = useMatch({ path: '/confirm/:link' }) || {};

  useEffect(() => {
    const { link } = params || {};
    if (!link) {
      navigate(RoutesMap.INDEX);
      return modalService.showError(MessagesMap.BAD_LINK);
    }
    app.account
      .loginOverLink('confirm', { link })
      .then((user) => {
        if (user) {
          return navigate(RoutesMap.ACCOUNT.INDEX);
        }
        modalService.showError(MessagesMap.BAD_LINK);
        navigate(RoutesMap.INDEX);
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
