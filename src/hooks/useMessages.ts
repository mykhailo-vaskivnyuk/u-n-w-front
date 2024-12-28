import { useEffect, useState } from 'react';
import { NetViewKeys } from '@server/types/types';
import { app } from '@client/app';

export const useMessages = (netView: NetViewKeys) => {
  const setUpdate = useState([])[1];
  const [chatId, setChatId] = useState(() => app.chat.getChatId(netView));
  const { messages } = app.getState();

  useEffect(() => {
    const handleMessage = (newChatId: number) =>
      setChatId((curChatId) => {
        if (newChatId === curChatId) setUpdate([]);
        return curChatId;
      });
    app.on('message', handleMessage);
    return () => app.remove('message', handleMessage);
  }, [setUpdate]);

  return (chatId && messages.get(chatId)) || [];
};
