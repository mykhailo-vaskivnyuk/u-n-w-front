import React, { FC, useCallback, useEffect } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { useMatchParam } from '@utils/utils';
// import { Button } from '@components/buttons/button/button';
import { useStyles } from './invite.styles';

const invitePath = RoutesMap.NET.INVITE;
const showSuccess = () => modalService.showMessage(MessagesMap.NET_CONNECTED);
const showFail = () => modalService.showError(MessagesMap.NET_CONNECT_FAIL);
const showExists = () => modalService.showError(MessagesMap.NET_CONNECT_EXISTS);
const showBadLink = () => modalService.showError(MessagesMap.BAD_LINK);

export const NetInviteForm: FC = () => {
  const { buttons } = useStyles();
  const navigate = useNavigateTo();
  const token = useMatchParam('token', invitePath, true, false) as string;

  const handleConfirm = useCallback(async () => {
    let result;
    try {
      result = await app.net.connectByInvite({ token });
    } catch {
      return;
    }
    if (!result) {
      showBadLink();
      return navigate.toIndex();
    }
    const { error } = result;
    if (!error) {
      showSuccess();
      return navigate.toNet(result).id(true, 'circle');
    }
    if (error === 'not parent net member') {
      showFail();
      return navigate.toIndex();
    }
    showExists();
    navigate.toNet(result).id(true);
  }, [navigate, token]);

  // const handleRefuse = () => navigate.toIndex();

  useEffect(() => {
    handleConfirm();
  }, [handleConfirm]);

  return (
    <div className={buttons}>
      {/* <Button btnType="secondary" onClick={handleConfirm}>
        підтвердити
      </Button>
      <div />
      <Button btnType="refuse" onClick={handleRefuse}>
        відмовитись
      </Button> */}
    </div>
  );
};
