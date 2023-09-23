import { useEffect } from 'react';
import { app } from '@client/app';

export const useTelegram = () => {
  useEffect(() => {
    const { tg } = app.getState();
    if (!tg) return;
    tg.expand();
  }, []);
};
