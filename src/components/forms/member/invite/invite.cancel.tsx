import React, { FC } from 'react';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';
import { Button } from '@components/buttons/button/button';
import { makeUrl } from '@utils/format.utils';
import { RoutesMap } from '@constants/router.constants';
import { InputSimple } from '@components/controls/input/input.simple';
import { useStyles } from './invite.styles';

const pathToInvite = RoutesMap.NET.INVITE;
const showSuccess = () => modalService.showMessage(MessagesMap.MEMBER_INVITE_CANCEL);
const showFail = () => modalService.showError(MessagesMap.MEMBER_INVITE_CANCEL_FAIL);

const handleCancel = () =>
  app.net.member!.inviteCancel().then((success) => {
    return success ? showSuccess() : showFail();
  });

export const MemberInviteCancelForm: FC = () => {
  const { buttons } = useStyles();
  const member = app.getState().memberData;
  const inviteUrl = makeUrl(pathToInvite, member!.token || '');

  return (
    <>
      <InputSimple label="Запрошення" defaultValue={inviteUrl} contentEditable={false} />
      <div className={buttons}>
        <Button btnType="secondary" onClick={handleCancel}>
          скасувати
        </Button>
      </div>
    </>
  );
};
