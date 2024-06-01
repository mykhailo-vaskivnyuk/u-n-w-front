import React, { FC, useCallback, useEffect } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { useMatchParam } from '@utils/utils';
// import { Button } from '@components/buttons/button/button';
import { useStyles } from './create.styles';

const invitePath = RoutesMap.ACCOUNT.WAIT.CREATE;
const showSuccess = () => modalService.showMessage(MessagesMap.WAIT_CREATED);
const showFail = () => modalService.showError(MessagesMap.NET_CONNECT_FAIL);
const showExists = () => modalService.showError(MessagesMap.WAIT_EXISTS);
const showBadLink = () => modalService.showError(MessagesMap.BAD_LINK);

export const WaitCreateForm: FC = () => {
  const { buttons } = useStyles();
  const navigate = useNavigateTo();
  const token = useMatchParam('token', invitePath, true, false) as string;

  const handleConfirm = useCallback(async () => {
    let result;
    try {
      result = await app.userNets.waitCreate({ token });
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
      return navigate.toWaitNets(true);
    }
    if (error === 'not parent net member') {
      showFail();
      return navigate.toIndex();
    }
    showExists();
    navigate.toWaitNets(true);
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
