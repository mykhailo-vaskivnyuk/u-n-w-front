import { createContext, useContext } from 'react';
import { AppBase } from '../app/common/client/app.base';

const appBaseContext = createContext({});
export const AppBaseContextProvider = appBaseContext.Provider;

export const useAppBaseContext = <T extends AppBase = AppBase>() => {
  return useContext(appBaseContext) as T;
};
