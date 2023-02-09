import React, { FC } from 'react';
import { app } from '@client/app';
import { Chat } from '../../components/chat/chat';

export const NetChat: FC = () => {
  const { circle, tree } = app.getState();
  const netMembersMap = new Map();
  circle.forEach((member) => netMembersMap.set(member.user_id, member));
  tree.forEach((member) => netMembersMap.set(member.user_id, member));
  return <Chat membersMap={netMembersMap} netView="net" />;
};
