import React, { FC } from 'react';
import { NetViewKeys } from '@server/types/types';
import { CHAT_NAME } from '@constants/dictionary';
import { useStyles } from './chat.title.styles';

interface ChatTitleProps {
  netView: NetViewKeys;
}

export const ChatTitle: FC<ChatTitleProps> = ({ netView }) => {
  const { container, root } = useStyles();
  const title = CHAT_NAME[netView];
  return (
    <div className={container}>
      <div className={root}>{title}</div>
    </div>
  );
};
