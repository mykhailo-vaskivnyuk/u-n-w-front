import React, { FC, useCallback, useState, ChangeEvent, useRef } from 'react';
import { NetViewKeys } from '@server/types/types';
import { app } from '@client/app';
import { useStyles } from './send.message.styles';

interface SendMessageProps {
  netView: NetViewKeys;
}

export const SendMessage: FC<SendMessageProps> = ({ netView }) => {
  const { root } = useStyles();
  const [value, setValue] = useState('');
  const [chatId] = useState(() => app.chat.getChatId(netView));
  const lastValue = useRef<string>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
    [],
  );

  const handleSend = useCallback(() => {
    const message = lastValue.current;
    if (!message) return;
    app.chat.sendMessage(message, chatId!).then(() => setValue(''));
  }, [chatId]);

  lastValue.current = value;

  return (
    <div className={root}>
      <textarea value={value} onChange={handleChange} />
      <button type="button" onClick={handleSend}>
        SEND
      </button>
    </div>
  );
};
