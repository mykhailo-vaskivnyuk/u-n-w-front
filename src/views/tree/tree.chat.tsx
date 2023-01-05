import { app } from '@api/app/client.app';
import clsx from 'clsx';
import React, { FC, useCallback, useState, ChangeEvent, useRef, useEffect } from 'react';
import { useStyles } from './tree.chat.styles';

interface IChatMessage {
  index: number;
  from: string;
  message: string;
}

const MESSAGES: IChatMessage[] = [];
/*
[
  { index: 1, from: 'name', message: 'some message\nsome message\nsome message ' },
  { index: 2, from: 'name', message: 'some message' },
  { index: 3, from: '', message: 'some message' },
  { index: 4, from: 'name', message: 'some message' },
];
*/

export const TreeChat: FC = () => {
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

  const ref = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
    [],
  );

  const handleSend = useCallback(() => {
    setValue(() => '');
    lastValue.current && app.netMethods.sendTreeMessage(lastValue.current);
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
    console.log('NEW COMPONENET');
    const onMessage = (data: any) => {
      console.log('SET MESSAGE');
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
