/* eslint-disable react/no-danger */
import React, { FC } from 'react';
import clsx from 'clsx';
import { modalService } from '@services/modal.service';
import { makeInnerHtmlWithLinks } from '@utils/format.utils';
import { ITableUsersBoardMessages } from 'api/local/db.types';
import { useStyles as useStylesChat } from '@components/chat/message/chat.message.styles';
import { app } from '@api/app/client.app';

interface BoardMessageProps {
  boardMessage: ITableUsersBoardMessages;
}

export const BoardMessage: FC<BoardMessageProps> = (props) => {
  const { root, board, name, message: clsMessage } = useStylesChat();
  const { boardMessage } = props;
  const { user } = app.getState();

  const { user_id: userId, message_id: messageId, message } = boardMessage;
  const handleOpen = () => modalService.showMessage(message);
  const myOwn = userId === user!.user_id;
  const innerHtml = { __html: makeInnerHtmlWithLinks(message) };

  return (
    <div key={messageId} className={clsx(root, board, { myOwn })}>
      <div className={name} onClick={handleOpen} aria-hidden="true">
        userName
      </div>
      <div className={clsMessage} dangerouslySetInnerHTML={innerHtml} />
    </div>
  );
};
