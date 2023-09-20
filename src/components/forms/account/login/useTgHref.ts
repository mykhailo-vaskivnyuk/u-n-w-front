import { RoutesMap } from '@constants/router.constants';
import { TELEGRAM_URL } from '@constants/constants';
import { app } from '@client/app';

export const useTgHref = () => {
  const { initData: inTg } = app.getState().tg;
  if (inTg) return;
  const pathname = localStorage.getItem('pathname') || RoutesMap.ROOT;
  const hash = `#${pathname}`;
  const tgHref = `${TELEGRAM_URL}&start=path${btoa(hash)}`;
  return tgHref;
};
