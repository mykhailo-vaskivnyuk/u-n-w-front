import React, { FC } from 'react';
import { useTree } from '@hooks/useTree';
import { Chat } from '../../components/chat/chat';

export const TreeChat: FC = () => {
  const tree = useTree();
  const treeMembersMap = new Map();
  tree.forEach((member) => treeMembersMap.set(member.user_id, member));
  return <Chat membersMap={treeMembersMap} netView="tree" />;
};
