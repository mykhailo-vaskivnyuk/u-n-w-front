import { FC, useEffect } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { useMatchParam } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';

const invitePath = RoutesMap.NET.INVITE;
const showSuccess = () => modalService.showMessage(MessagesMap.NET_CONNECTED);
const showFail = () => modalService.showError(MessagesMap.NET_CONNECT_FAIL);
const showExists = () => modalService.showError(MessagesMap.NET_CONNECT_EXISTS);
const showBadLink = () => modalService.showError(MessagesMap.BAD_LINK);

export const NetInvite: FC = () => {
  const navigate = useNavigateTo();
  const token = useMatchParam('token', invitePath, true, false) as string;

  useEffect(() => {
    if (!token) {
      showBadLink();
      return navigate.back();
    }
    app.net
      .connectByInvite({ token })
      .then((result) => {
        if (!result) {
          showBadLink();
          return navigate.back();
        }
        const { error } = result;
        if (error) {
          if (error === 'not parent net member') {
            showFail();
            return navigate.back();
          }
          showExists();
          navigate.toNet(result).id(true);
        } else {
          showSuccess();
          navigate.toNet(result).id(true, 'circle');
        }
      })
      .catch(navigate.back);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
