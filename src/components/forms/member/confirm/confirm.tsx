import React, { FC } from 'react';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';
import { Button } from '@components/buttons/button/button';
import { useStyles } from './confirm.styles';

const show = {
  success: {
    confirm: () => modalService.showMessage(MessagesMap.MEMBER_CONFIRMED),
    refuse: () => modalService.showMessage(MessagesMap.MEMBER_INVITE_CANCEL),
  },
  fail: {
    confirm: () => modalService.showError(MessagesMap.MEMBER_CONFIRM_FAIL),
    refuse: () => modalService.showError(MessagesMap.MEMBER_INVITE_CANCEL_FAIL),
  },
};

const handleConfirm = () =>
  app.net
    .member!.inviteConfirm()
    .then((success) => (success ? show.success.confirm() : show.fail.confirm()))
    .catch(() => {});

const handleRefuse = () =>
  app.net
    .member!.inviteRefuse()
    .then((success) => (success ? show.success.refuse() : show.fail.refuse()))
    .catch(() => {});

export const MemberConfirmForm: FC = () => {
  const { buttons } = useStyles();

  return (
    <div className={buttons}>
      <Button btnType="secondary" onClick={handleConfirm}>
        підтвердити
      </Button>
      <div />
      <Button btnType="refuse" onClick={handleRefuse}>
        відмовити
      </Button>
    </div>
  );
};
