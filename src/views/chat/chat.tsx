import { app } from '@api/app/client.app';
import clsx from 'clsx';
import React, { FC, useCallback, useState, ChangeEvent, useRef, useEffect } from 'react';
import { useStyles } from './chat.styles';

interface IChatMessage {
  index: number;
  from: string;
  message: string;
}

const MESSAGES: IChatMessage[] = [];

export const Chat: FC = () => {
  const {
    container,
    readFieldContainer,
    readField,
    sendField,
    message: clsMessage,
    name: clsName,
  } = useStyles();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [value, setValue] = useState('');
  const lastValue = useRef<string>();
  lastValue.current = value;

  useEffect(() => console.log('NEW CHAT'), []);

  const ref = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
    [],
  );

  const handleSend = useCallback(() => {
    const { netView } = app.getState();
    setValue(() => '');
    lastValue.current && app.netMethods.sendMessage(lastValue.current, netView!);
  }, []);

  const messagesJsx = messages.map(({ index, from, message }) => (
    <div key={index} className={clsx(clsMessage, { myOwn: !from })}>
      <div className={clsx(clsName, { myOwn: !from })}>{from || 'my own'}</div>
      {message}
    </div>
  ));

  useEffect(() => {
    const el = ref.current;
    el && el.scrollTo(0, el.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MESSAGES.length]);

  useEffect(() => {
    const onMessage = (data: any) => {
      setMessages((mess) => [
        ...mess,
        { index: mess.length + 1, from: 'name', message: data.message },
      ]);
    };
    app.setOnChatMessage?.(onMessage);
  }, []);

  return (
    <div className={container}>
      <div className={readFieldContainer} ref={ref}>
        <div className={readField}>{messagesJsx}</div>
      </div>
      <div className={sendField}>
        <textarea value={value} onChange={handleChange} />
        <button type="button" onClick={handleSend}>
          SEND
        </button>
      </div>
    </div>
  );
};
