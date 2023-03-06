import React, { FC } from 'react';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';
import { Button } from '@components/buttons/button/button';
import { useStyles } from './invite.styles';

const showSuccess = () => modalService.showMessage(MessagesMap.MEMBER_INVITE_CANCEL);
const showFail = () => modalService.showError(MessagesMap.MEMBER_INVITE_CANCEL_FAIL);

const handleCancel = () =>
  app.net.member!.inviteCancel().then((success) => {
    return success ? showSuccess() : showFail();
  });

export const MemberInviteCancelForm: FC = () => {
  const { buttons } = useStyles();

  return (
    <div className={buttons}>
      <Button btnType="secondary" onClick={handleCancel}>
        скасувати
      </Button>
    </div>
  );
};
