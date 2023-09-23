import { RoutesMap } from '@constants/router.constants';
import { TELEGRAM_URL } from '@constants/constants';
import { app } from '@client/app';

export const useTgHref = () => {
  const { tg } = app.getState();
  if (tg) return;
  const pathname = localStorage.getItem('pathname') || RoutesMap.ROOT;
  const hash = `#${pathname}`;
  const tgHref = `${TELEGRAM_URL}&start=path${btoa(hash)}`;
  return tgHref;
};
