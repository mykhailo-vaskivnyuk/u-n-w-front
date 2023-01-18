import React, { FC } from 'react';
import { useCircle } from '@hooks/useCircle';
import { Chat } from '../../components/chat/chat';

export const CircleChat: FC = () => {
  const circle = useCircle();
  const circleMembersMap = new Map();
  circle.forEach((member) => circleMembersMap.set(member.user_id, member));
  return <Chat membersMap={circleMembersMap} netView="circle" />;
};
