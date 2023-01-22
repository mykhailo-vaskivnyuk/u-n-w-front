import React, { FC } from 'react';
import { IMember } from '@api/app/types';
import { NetViewKeys } from '@api/api/types/types';
import { ChatTitle } from './title/chat.title';
import { ReadArea } from './read.area/read.area';
import { SendMessage } from './send.message/send.message';
import { useStyles } from './chat.styles';

interface ChatProps {
  membersMap: Map<number, IMember>;
  netView: NetViewKeys;
}

export const Chat: FC<ChatProps> = (props) => {
  const { container } = useStyles();
  const { netView } = props;

  return (
    <div className={container}>
      <ChatTitle netView={netView} />
      <ReadArea {...props} />
      <SendMessage netView={netView} />
    </div>
  );
};
