import React, { FC } from 'react';
import clsx from 'clsx';
import { useStyles } from './chat.message.styles';

interface ChatMessageProps {
  index: number;
  from: string;
  myOwn: boolean;
  message: string;
}

export const ChatMessage: FC<ChatMessageProps> = (props) => {
  const { root, name, message: clsMessage } = useStyles();
  const { index, from, myOwn, message } = props;

  return (
    <div key={index} className={clsx(root, { myOwn })}>
      <div className={name}>{from}</div>
      <div className={clsMessage}>{message}</div>
    </div>
  );
};
