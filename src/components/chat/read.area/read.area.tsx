import React, { FC, useRef, useEffect } from 'react';
import { IMember } from '@client/types';
import { NetViewKeys } from '@server/types/types';
import { useMessages } from '@hooks/useMessages';
import { app } from '@client/app';
import { ChatMessage } from '../message/chat.message';
import { useStyles } from './read.area.styles';

interface ReadAreaProps {
  membersMap: Map<number, IMember>;
  netView: NetViewKeys;
}

export const ReadArea: FC<ReadAreaProps> = (props) => {
  const { container, root } = useStyles();
  const { membersMap, netView } = props;
  const ref = useRef<HTMLDivElement>(null);

  const messages = useMessages(netView);

  const messagesJsx = messages.map(({ index, user_id, message }) => {
    const { user } = app.getState();
    const myOwn = user_id === user!.user_id;
    const from = myOwn ? 'Я' : membersMap.get(user_id)?.member_name || 'Невідомий';
    return <ChatMessage key={index} index={index} from={from} myOwn={myOwn} message={message} />;
  });

  useEffect(() => {
    const el = ref.current;
    el && el.scrollTo(0, el.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  return (
    <div className={container} ref={ref}>
      <div className={root}>{messagesJsx}</div>
    </div>
  );
};
