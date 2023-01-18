import React, { FC } from 'react';
import { NetViewKeys } from '@api/api/types/types';
import { useStyles } from './chat.title.styles';

interface ChatTitleProps {
  netView?: NetViewKeys;
}

export const ChatTitle: FC<ChatTitleProps> = ({ netView }) => {
  const { root } = useStyles();
  return <div className={root}>{!netView ? 'net' : netView} chat</div>;
};
