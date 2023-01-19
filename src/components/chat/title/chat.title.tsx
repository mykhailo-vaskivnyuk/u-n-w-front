import React, { FC } from 'react';
import { NetViewKeys } from '@api/api/types/types';
import { useStyles } from './chat.title.styles';

interface ChatTitleProps {
  netView?: NetViewKeys;
}

export const ChatTitle: FC<ChatTitleProps> = ({ netView }) => {
  const { container, root } = useStyles();
  const title = `${!netView ? 'net' : netView} chat`;
  return (
    <div className={container}>
      <div className={root}>{title}</div>
    </div>
  );
};
