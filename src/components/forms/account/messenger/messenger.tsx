import React, { FC } from 'react';
import { MessagesMap } from '@constants/messages';
import { Button } from '@components/buttons/button/button';
import { modalService } from '@services/modal.service';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { app } from '@app/common/client/app';
import { useStyles } from './messenger.styles';

const showFail = () => modalService.showError(MessagesMap.MEMBER_INVITE_CREATE_FAIL);

export const MessengerForm: FC = () => {
  const { buttons } = useStyles();
  const navigate = useNavigateTo();

  const handleClick = async () => {
    const link = await app.account.messenger.getLink().catch(() => {});
    if (!link) return showFail();
    navigate.toIndex();
    window.open(link);
  };

  return (
    <div className={buttons}>
      <Button type="button" btnType="primary" onClick={handleClick}>
        connect
      </Button>
    </div>
  );
};
