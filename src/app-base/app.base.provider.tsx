import React, { FC, PropsWithChildren } from 'react';
import { AppBase } from '../app/common/client/app.base';
import { AppBaseContextProvider } from './app.base.context';

export const appBase = new AppBase();

declare global {
  interface Window {
    appBase: AppBase;
  }
}
window.appBase = appBase;

export const AppBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  return <AppBaseContextProvider value={appBase}>{children}</AppBaseContextProvider>;
};
